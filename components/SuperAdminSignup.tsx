import React, { useState } from 'react'
import InputField from './InputField'
import axiosClient from '@/axios-client'
import { useStateContext } from '@/context/ContextProvider'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'

function SuperAdminSignup() {

    const [errors, setErrors] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const {setUser, setToken, errorNotify, notification, setErrorNotify, setNotification} = useStateContext()
      

    const [agentForm, setAgentForm] = useState({
      name: "",
      email: "",
      mobile: "",
      lga: "",
      city: "",
      state: "",
      country: "",
      password: "",
    })

    const onAgentSignUp = () => {
        const payLoad = {
                name: agentForm.name,
                email: agentForm.email,
                mobile: agentForm.mobile,
                city: agentForm.city,
                lga: agentForm.lga,
                state: agentForm.state,
                country: agentForm.country,
                password: agentForm.password,
              }
        
              console.log(payLoad);
        
        
              setLoading(true);
              axiosClient.post("/signup/agent", payLoad)
              .then((data) => {
                setLoading(false);
                if (data.status == 201) {
                  setSuccessMsg(true)
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

  return (
    <div className='col-md-12 mx-auto mt-[50px] px-5 mb-5'>
        <h2 className='font-bold text-24 text-center mb-5'>Agent Sign Up</h2>
        <div className='row'>
            <div className='col-md-12 flex flex-col gap-5'>
                <div className='row'>
                    <InputField
                        title="Name"
                        type='text'
                        value={agentForm.name}
                        handleChangeText={(e: any) => setAgentForm({...agentForm, name: e.target.value})}
                        placeholder='Enter your full name'
                        disabled={false}
                        required={true}
                        otherStyles='w-full'
                    /> 
                </div>

                <div className='row mt-5'>
                    <InputField
                        title="Email"
                        type='text'
                        value={agentForm.email}
                        handleChangeText={(e: any) => setAgentForm({...agentForm, email: e.target.value})}
                        placeholder='Enter your email address'
                        disabled={false}
                        required={true}
                        otherStyles='col-md-6'
                    /> 
                    <InputField
                        title="Contact Number"
                        type='text'
                        value={agentForm.mobile}
                        handleChangeText={(e: any) => setAgentForm({...agentForm, mobile: e.target.value})}
                        placeholder='Enter your Mobile Number'
                        disabled={false}
                        required={true}
                        otherStyles='col-md-6'
                    /> 
                </div>

                <div className='row mt-5'>
                    <InputField
                        title="City"
                        type='text'
                        value={agentForm.city}
                        handleChangeText={(e: any) => setAgentForm({...agentForm, city: e.target.value})}
                        placeholder='Enter your city address'
                        disabled={false}
                        required={true}
                        otherStyles='col-md-6'
                    /> 
                    <InputField
                        title="Local Government Area"
                        type='text'
                        value={agentForm.lga}
                        handleChangeText={(e: any) => setAgentForm({...agentForm, lga: e.target.value})}
                        placeholder='Enter your LGA'
                        disabled={false}
                        required={true}
                        otherStyles='col-md-6'
                    /> 
                </div>

                <div className='row mt-5'>
                    <InputField
                    title="State"
                    type='text'
                    value={agentForm.state}
                    handleChangeText={(e: any) => setAgentForm({...agentForm, state: e.target.value})}
                    placeholder='Enter your state address'
                    disabled={false}
                    required={true}
                    otherStyles='col-md-6'
                    /> 
                    <InputField
                    title="Country"
                    type='text'
                    value={agentForm.country}
                    handleChangeText={(e: any) => setAgentForm({...agentForm, country: e.target.value})}
                    placeholder='Enter your country Number'
                    disabled={false}
                    required={true}
                    otherStyles='col-md-6'
                    /> 
                </div>

                    <InputField
                        title="Password"
                        type='password'
                        value={agentForm.password}
                        handleChangeText={(e: any) => setAgentForm({...agentForm, password: e.target.value})}
                        placeholder='Enter your password'
                        disabled={false}
                        required={true}
                        otherStyles='w-full'
                    />    

                <div className='mt-5 '>
                    <button 
                    type='submit' 
                    onClick={onAgentSignUp}
                    disabled={loading}
                    className='bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded'
                    >
                    {
                        loading 
                        ?
                        <Loader2 className='animate-spin'/>
                        :
                        "Sign Up"
                    }
                    </button>
                    <div className='mt-3'>
                    Already have an account? <Link href={"/sign-in"} className='text-blue-500'>Sign In</Link> here
                    </div>
                </div>
                {
                    successMsg && 
                    <div className="bg-blue-500 p-1 w-full text-black mt-3 flex justify-center items-center space-x-3">
                    <p className='text-white'>Your sign up process was successful. </p><FaArrowRight className='text-white'/> <Link href="/sign-in" className='text-blue-500 p-1 bg-white rounded shadow-white hover:shadow-md'>Sign in here</Link>
                    </div>
                }
                {errors && 
                <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
            </div>
        </div>
    </div>
  )
}

export default SuperAdminSignup