'use client'

import axios from 'axios'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function page() {
    const router = useRouter()
    const [email, setEmail] = useState<any>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [notification, setNotification] = useState<string>("")


    async function handleCheckEmail(){
        const payLoad = {
            email
        }
        setIsLoading(true)
        await axios.post("/api/login/forgot-password/email-check", payLoad)
        .then(data => {
            // console.log(data);
            setIsLoading(false)
            if (data.status === 200) {
                const response = JSON.parse(data.data)
                if (response.msg == "Email Exists") {
                    toast.success("Your email was found. Processing...")
                    setTimeout(async () => {
                        setIsLoading(true)
                        await axios.post("/api/email/nodemailer", payLoad)
                            .then(data => {
                                setIsLoading(false)
                                console.log(data);
                                toast.success("")
                                setNotification(`An email has been sent to your email address. (${email})`)
                            })
                            .catch(err => {
                                setIsLoading(false)
                                console.log(err);
                                
                            })
                    }, 1000)
                }
            }
        })
        .catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }

  return (
    <div className='flex flex-col justify-center items-center gap-5 w-full h-[90vh]'>
        <h1 className='text-center font-bold text-xl'>Password Reset</h1>
        <div className='flex flex-col justify-center border bg-gray-100 rounded-md w-[500px] h-[300px] p-3'>
            <div className='flex flex-col justify-center gap-5 bg-white p-5 w-full h-full'>
                {
                    notification
                    &&
                    <div className='bg-green-700 p-2 rounded text-center text-white'>{notification}</div>
                }
                <div>
                    <label htmlFor="">Email Address</label>
                    <input type="text" onChange={(e: any) => setEmail(e.target.value)} className='p-2 w-full border-2' placeholder='Enter email address here...' required/>
                </div>
                <button 
                    onClick={handleCheckEmail} 
                    className='flex justify-center bg-main-100 p-2 w-full rounded-2xl text-white hover:shadow-xl'
                >
                    {
                        isLoading
                        ?
                        <Loader className='animate-spin'/>
                        :
                        "Submit"
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default page
