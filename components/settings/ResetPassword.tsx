'use client'


import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '@/axios-client';
import { ParamValue } from 'next/dist/server/request/params';

function ResetPassword({email}: {email: string | ParamValue}) {
  const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    })

    console.log(email);
    
    
    function handlePasswordReset() {
        if (form.password !== form.confirmPassword) {
            toast.error("The passwords do not match")
        }

        const payLoad = {
            email,
            password: form.password
        }
        
        axiosClient.post("/reset-password", payLoad)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
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
                    <input type="text" onClick={(e: any) => setForm({...form, password: e.target.value})} className='p-2 w-full border-2' placeholder='Enter email address here...' required/>
                </div>
                <div>
                    <label htmlFor="">Confirm Password</label>
                    <input type="text" onClick={(e: any) => setForm({...form, confirmPassword: e.target.value})} className='p-2 w-full border-2' placeholder='Enter email address here...' required/>
                </div>
                <button onClick={handlePasswordReset} className='bg-main-100 p-2 w-full rounded-2xl text-white hover:shadow-xl'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword
