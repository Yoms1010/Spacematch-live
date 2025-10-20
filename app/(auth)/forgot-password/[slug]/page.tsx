'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Loader } from 'lucide-react';

function page() {
    const router = useRouter()
    const params: any = useParams()
    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    function handlePasswordReset() {
        if (!form.password || !form.confirmPassword) {
            return toast.error("The fields are required!")
        }

        if (form.password !== form.confirmPassword) {
            return toast.error("The passwords do not match")
        }
        const name = params?.slug?.split("%")[0]
        const domain = params?.slug?.split("0")[1]
        const payLoad = {
            email: `${name}@${domain}`,
            password: form.password
        }
        setIsLoading(true)
        axios.post("/api/login/forgot-password/reset-password", payLoad)
        .then(data => {
            setIsLoading(false)
            console.log(data);
            if (data.status === 200) {
                if (data.data.alert == "susccessful") {
                    toast.success(data.data.msg+". Redirecting...")
                    setTimeout(() => {
                        router.replace("/sign-in")
                    }, 900)
                }
            }
        })
        .catch(err => {
            setIsLoading(false)
            console.log(err);
            toast.error("An error occurred. Try again later.")
        })
    }

  return (
    <div className='flex flex-col justify-center items-center gap-5 w-full h-[90vh]'>
        <h1 className='text-center font-bold text-xl'>Password Reset</h1>
        {/* {slug} */}
        <div className='flex flex-col justify-center border bg-gray-100 rounded-md w-[500px] h-[300px] p-3'>
            <div className='flex flex-col justify-center gap-5 bg-white p-5 w-full h-full'>
                <div>
                    <label htmlFor="">New Password</label>
                    <input type="password" onChange={(e: any) => setForm({...form, password: e.target.value})} className='p-2 w-full border-2' placeholder='Enter email address here...' required/>
                </div>
                <div>
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" onChange={(e: any) => setForm({...form, confirmPassword: e.target.value})} className='p-2 w-full border-2' placeholder='Enter email address here...' required/>
                </div>
                <button onClick={handlePasswordReset} className='flex justify-center bg-main-100 p-2 w-full rounded-2xl text-white hover:shadow-xl'>{isLoading ? <Loader className='animate-spin'/> : "Submit"}</button>
            </div>
        </div>
    </div>
  )
}

export default page
