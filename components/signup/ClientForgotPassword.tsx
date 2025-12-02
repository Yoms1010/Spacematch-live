'use client'

import { useStateContext } from "@/context/ContextProvider"
import { useState } from "react"
import InputField from "../InputField"
import axios from "axios"
import { Loader } from "lucide-react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { FaArrowRight } from "react-icons/fa6"
import Link from "next/link"

function ClientForgotPassword({ userId, buyerId, email, duration, setDuration, startCountdown, setStartCountdown, isPlaying, setIsPlaying }: any) {
    const [isReceived, setIsReceived] = useState<boolean>(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const { errorNotify, setErrorNotify, notification, setNotification } = useStateContext()
    const [otp, setOtp] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>()
    const [isLoading, setIsLoading] = useState<any>()

    const otpVerification = async () => {
        try {
            if (userId && buyerId === null) return alert("Empty")
            const payLoad = {
                userId: userId,
                buyerId: buyerId,
            }
            let sentOtp = typeof window !== "undefined" && window.localStorage.getItem("otp")
            if (sentOtp !== otp) return setErrorNotify("The otp is invalid");
            const res = await axios.post("/api/signup/client/forgot-password", payLoad)
            console.log(res);
            const response = res;
            console.log(response);
            if (response.status === 200) {
                if (response.data.status === 201) {
                    setSuccessMsg(true)
                    setDuration(0)
                    setStartCountdown(false)
                    setIsPlaying(false)
                    setIsReceived(false)
                    typeof window !== "undefined" && window.localStorage.setItem("buyer", "success")
                }
            }
        } catch (error) {
            console.log(error);
            setErrorNotify("An error occurred, kindly fix it before you can proceed.")
        }
    }


    const onOtpResend = async () => {
        try {
            const payLoad = {
                email: email
            }
            const res = await axios.post("/api/signup/client/forgot-password/resent-otp", payLoad)
            setIsLoading(false)
            const response = res;
            console.log(response);
            if (response.status === 200) {
                if (response.data.status === 201) {
                    typeof window !== "undefined" && window.localStorage.setItem("otp", response?.data?.otp)
                    setDuration(0)
                    setDuration(120)
                    setStartCountdown(true)
                    setIsPlaying(true)
                    setNotification("Otp has been resent")
                    alert(response?.data?.message)
                }
            } else {
                setIsLoading(false)
                setErrorNotify("An error occurred, kindly fix it before you can proceed.")
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setErrorNotify("An error occurred, kindly fix it before you can proceed.")
        }
    }

    return (
        <div className='col-md-10 mx-auto mt-[50px]'>
            <div className="border">
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
                                    <Loader className='animate-spin' />
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
                                setIsReceived(true)
                                setDuration(0)
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
                            <p className='text-white'>Your sign up process was successful. </p> <FaArrowRight className='text-white' /> <Link href="/sign-in" className='text-blue-500 p-1 bg-white rounded shadow-white hover:shadow-md'>Sign in here</Link>
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
        </div>
    )
}

export default ClientForgotPassword