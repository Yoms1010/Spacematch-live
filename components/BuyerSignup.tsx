import React, { useRef, useState } from 'react'
import InputField from '@/components/InputField'
import { useStateContext } from '@/context/ContextProvider';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';
import { countryCode } from '@/constants';
import axiosClient from '@/axios-client';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import RefundPolicy from './RefundPolicy';
import TermsAndConditions from './TermsAndConditions';

function BuyerSignup() {

    const [buyerForm, setBuyerForm] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        occupation: "",
        city: "",
        lga: "",
        state: "",
        country: "",
        terms_and_conditions: "",
        refund_policy: ""
    })
    const codeRef = useRef<any>(null)
    const refundPolicyRef = useRef<any>(null)
    const termsAndConditionsRef = useRef<any>(null)
    

    const [otp, setOtp] = useState<string>("")
    const [userId, setUserId] = useState()
    const [buyerId, setBuyerId] = useState()
    const [sendOtp, setSendOtp] = useState(false)
    const [errors, setErrors] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [startCountdown, setStartCountdown] = useState(false)
    const [isReceived, setIsReceived] = useState<boolean>(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const onBuyerSignUp = () => {
        const payLoad = {
            name: buyerForm.name,
            email: buyerForm.email,
            code: codeRef.current.value,
            mobile: buyerForm.mobile,
            occupation: buyerForm.occupation,
            password: buyerForm.password,
            terms_and_conditions: termsAndConditionsRef.current.value,
            refund_policy: refundPolicyRef.current.value
        }

        setLoading(true);
        axiosClient.post("/signup/buyer", payLoad)
        .then((data) => {
        setLoading(false);
        if (data.status == 201) {
            // console.log(data.data);
            setSendOtp(true)
            setDuration(30)
            setStartCountdown(true)
            setIsPlaying(true)
            localStorage.setItem("otp", data?.data?.otp)
            setUserId(data?.data?.userId)
            setBuyerId(data?.data?.buyerId)
            
        }
        }) 
        .catch(err => {
        setLoading(false);
        console.log(err)
        const response = err.response;
            if (response && response.status === 422) {
                    setLoading(false)
                    setErrorNotify("An error occurred, kindly fix it before you can proceed.")
                    // console.log(data);
                if (response.data.errors) {
                        setErrors(response.data.errors)
                        console.log(response.data.errors);
                        
                }else{
                    setErrors({
                        email: [response.data.msg]
                    })
                }
            }else{
                setLoading(false)
                setErrorNotify("Oops!! Some errors occurred.")
            }
        })
    }
        
    
    const otpVerification = () => {
    
          if(userId && buyerId === null) return alert("Empty")
    
          const payLoad = {
            userId: userId,
            buyerId: buyerId,
          }
    
          let sentOtp = localStorage.getItem("otp")
    
          if (sentOtp !== otp) return  setErrorNotify("The otp is invalid");
    
          setLoading(true);
          axiosClient.post("/buyer/otp", payLoad)
          .then((data) => {
            setLoading(false);
            if (data.status == 201) {
              setSuccessMsg(true)
              setDuration(0)
              setStartCountdown(false)
              setIsPlaying(false)
              setIsReceived(false)
              localStorage.setItem("buyer", "success")
            }
          }) 
          .catch(err => {
            setLoading(false);
            console.log(err)
            const response = err.response;
                if (response && response.status === 422) {
                        setLoading(false)
                        setErrorNotify("An error occurred, kindly fix it before you can proceed.")
                        // console.log(data);
                    if (response.data.errors) {
                            setErrors(response.data.errors)
                            console.log(response.data.errors);
                            
                    }else{
                        setErrors({
                            email: [response.data.msg]
                        })
                    }
                }else{
                    setLoading(false)
                    setErrorNotify("Oops!! Some errors occurred.")
                }
          })
        }   
    

    const onOtpResend = () => {
        const payLoad = {
            email: buyerForm.email
        }

        axiosClient.post("/resend-client-otp", payLoad)
        .then((data) => {
            localStorage.setItem("otp", data?.data?.otp)
            setDuration(0)
            setDuration(120)
            setStartCountdown(true)
            setIsPlaying(true)
            setNotification("Otp has been resent")
            alert(data?.data?.message)
        })
        .catch(err => {
            console.log(err);
        })
    }

  return (
    <div className='flex justify-center items-center'>
        <div className='bg-white p-3 w-full'>
            <h2 className='font-bold text-24 text-center mb-5'>Client Sign Up</h2>
            {
            !sendOtp 
            ?
            <div className='row'>
                <div className='col-md-12 gap-5'>
                    <div className='row mb-5'>
                        <InputField
                        title="Name"
                        type='text'
                        value={buyerForm.name}
                        handleChangeText={(e: any) => setBuyerForm({...buyerForm, name: e.target.value})}
                        placeholder='Enter your full name'
                        disabled={false}
                        required={true}
                        otherStyles='col-md-6'
                        />
                        <InputField
                        title="Email"
                        type='text'
                        value={buyerForm.email}
                        handleChangeText={(e: any) => setBuyerForm({...buyerForm, email: e.target.value})}
                        placeholder='Enter your email address'
                        disabled={false}
                        required={true}
                        otherStyles='col-md-6'
                        />
                    </div>

                    <div className='row my-5'> 
                        <div className='flex justify-center items-center w-full mt-5 max-sm:mb-5 col-md-6'>
                            {/* country code select */}
                            <div className={`w-[30%]`}>
                                <div className="text-16 text-gray-600  font-semibold mb-1">Code</div>
                                <div className="flex justify-center items-center w-full bg-black-10">
                                    <select
                                        ref={codeRef}
                                        className="flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-full border border-gray-300 rounded-bl-xl rounded-tl-xl rounded-r-none"
                                    >
                                        {
                                        countryCode.map((item, i) => (
                                            <option value={item.dial_code} key={i} selected={item.dial_code == ""}>
                                                <img src={item.image} alt="" className='h-8 w-8' />
                                                {item.dial_code}&nbsp;{item.name}
                                            </option>
                                        ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* mobile number field  */}
                            <div className='w-[70%]'>
                                <div className="text-16 text-gray-600  font-semibold mb-1">Contact Number</div>
                                <div className="flex justify-center items-center w-full bg-black-100 border border-gray-300 rounded-br-xl rounded-tr-xl">
                                    <input
                                        value={buyerForm.mobile}
                                        placeholder="Your contact number"
                                        onChange={(e: any) => setBuyerForm({...buyerForm, mobile: e.target.value})}
                                        type="text"
                                        disabled={false}
                                        required={true}
                                        className={`flex-1 text-gray-500 font-psemibold text-base outline-none w-full p-2 rounded-xl rounded-l-none`}
                                    />
                                </div>
                            </div>

                        </div> 
                        <InputField
                            title="Occupation"
                            type='text'
                            value={buyerForm.occupation}
                            handleChangeText={(e: any) => setBuyerForm({...buyerForm, occupation: e.target.value})}
                            placeholder='Enter your occupation'
                            disabled={false}
                            required={false}
                            otherStyles='col-md-6'
                        />
                    </div>
                        
                    <InputField
                        title="Password"
                        type='password'
                        value={buyerForm.password}
                        handleChangeText={(e: any) => setBuyerForm({...buyerForm, password: e.target.value})}
                        placeholder='Enter your password'
                        disabled={false}
                        required={true}
                        otherStyles='w-full mt-5'
                    />    
                    {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                        }
                    <div className='col-md-12 my-5'>
                        <div className="flex justify-start items-center space-x-2 w-full bg-black-100 rounded-br-xl rounded-tr-xl">
                            <input
                                ref={termsAndConditionsRef}
                                type="checkbox"
                                disabled={false}
                                required={true}
                                className={``}
                            />
                            <label htmlFor="" className='text-sm'>This means that you agree with the <button onClick={() => setOpenModal(true)} className='underline text-main-100'>SpaceMatch terms and conditions</button></label>
                        </div>
                    </div>
                    <div className='col-md-12 my-5'>
                        <div className="flex justify-start items-center space-x-2 w-full bg-black-100 rounded-br-xl rounded-tr-xl">
                            <input
                                ref={refundPolicyRef}
                                type="checkbox"
                                disabled={false}
                                required={true}
                                className={``}
                            />
                            <label htmlFor="" className='text-sm'>This means that you agree with the <button onClick={() => setModalOpen(true)} className='underline text-main-100'>SpaceMatch refund policy.</button></label>
                        </div>
                    </div>

                    <div className='mt-5 '>
                        <button 
                        type='submit' 
                        onClick={onBuyerSignUp}
                        className='btn bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded'
                        >
                        {
                            loading 
                            ?
                            <div className='flex justify-center items-center w-full'>
                                <Loader className='animate-spin'/>
                            </div>
                            :
                            "Sign Up"
                            }
                        </button>
                        <div className="p-1 w-full text-black mt-3 flex justify-center items-center space-x-3">
                            <p className='text-gray-700'>Already have an account?. </p><FaArrowRight className='text-black-1'/> <Link href="/sign-in" className='text-blue-500 p-1 bg-white rounded shadow-white hover:shadow-md'>Sign in here</Link>
                        </div>
                    </div>
                    {
                    successMsg && 
                    <div className="bg-blue-500 p-1 w-full text-black mt-3 flex justify-center items-center space-x-3">
                        <p className='text-white'>Your sign up process was successful. </p><FaArrowRight className='text-white'/> <Link href="/sign-in" className='text-blue-500 p-1 bg-white rounded shadow-white hover:shadow-md'>Sign in here</Link>
                    </div>
                    }
                        
                </div> 
            </div>
            :
            <div className='col-md-7 mx-auto mt-[50px]'>
            <InputField
                title="OTP Verification (Make sure to check your mail spam as well)"
                type='text'
                value={otp}
                handleChangeText={(e: any) => setOtp(e.target.value)}
                placeholder='Enter your otp'
                disabled={false}
                required={true}
                otherStyles='col-md-12 mb-5'
                /> 
                <div className='flex flex-col justify-center items-center gap-4'>
                    <button 
                        type='submit' 
                        onClick={otpVerification}
                        className='btn bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded'
                    >
                        {
                            loading 
                            ?
                            <div className='flex justify-center items-center w-full'>
                                <Loader className='animate-spin'/>
                            </div>
                            :
                            "Proceed"
                        }
                    </button>

                    {
                        startCountdown
                        &&
                        <CountdownCircleTimer
                            isPlaying={isPlaying}
                            duration={duration}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[7, 5, 2, 0]}
                            size={80}
                            onComplete={() => {
                            // do your stuff her
                                setIsReceived(true)
                                setDuration(0)
                                // return { shouldRepeat: true, delay: 1.5 }
                            }}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    }

                    {/* Resend otp code  */}
                    {
                        isReceived
                        &&
                        <div className='flex justify-center items-center space-x-1'>
                            <p>Didn't recieved the code?</p>  <button onClick={onOtpResend} className='text-main-100'>Resend Code</button>
                        </div>
                    }
                    {
                        successMsg && 
                        <div className="bg-blue-500 p-1 w-full text-black mt-3 flex justify-center items-center space-x-3">
                            <p className='text-white'>Your sign up process was successful. </p> <FaArrowRight className='text-white'/> <Link href="/sign-in" className='text-blue-500 p-1 bg-white rounded shadow-white hover:shadow-md'>Sign in here</Link>
                        </div>
                    }
                    {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                    {errorNotify && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                        {errorNotify}
                    </div>
                    }
                </div>
            </div>
            }
        </div>

        <RefundPolicy modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        <TermsAndConditions openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}

export default BuyerSignup
