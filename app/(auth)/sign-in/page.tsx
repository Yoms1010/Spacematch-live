'use client'


import { useStateContext } from '@/context/ContextProvider';
import axios from 'axios';
import { Eye, EyeOff, Loader } from 'lucide-react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState<boolean>(false)
    const {setUser, token, setToken} = useStateContext()

    const router = useRouter()

    
  // if (token) redirect("/in")

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        const payLoad = {
          email,
          password
        }
        setLoading(true)
        const res = await axios.post("/api/login", payLoad)
        // console.log(res.data);
        setLoading(true)
        if (res.status === 200) {
          if (res.data.message === "Login successful") {
            setUser(res?.data.user)
            setToken(res?.data.token)
            setLoading(false)
            toast.success("Signed in successfully")
            const callerRouter = typeof window != undefined && window.localStorage.getItem("callerpage")
            if (callerRouter) {
              router.push(""+callerRouter)
              return  typeof window != undefined && window.localStorage.removeItem("callerpage")
            }
            router.push("/in")
          }else{
            // console.log(res);
            const resData = res.data
            setLoading(false)
            if (resData.error === "An internal server error occurred.") {
              toast.error("Error: Kindly check your connection..")
            }
            toast.error("Invalid credentials")
          }
          
        }else{
          console.log("Error: Kindly try again..");
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false)
        // toast.error(error.message)
      }
    }

  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
          <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
        </div>
      }
    >
      <div className="min-h-screen flex items-center justify-center text-gray-900 px-4 pt-24 pb-12">
      <div className="md:flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white bg-gray-100/50 backdrop-blur-lg border border-gray-300/50">
        {/* Left Section (Image and Text) */}
        <div
          className="relative hidden md:flex flex-1 items-center justify-center p-6 bg-cover bg-center"
          style={{ backgroundImage: "url(/signup-bg.jpeg)" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative text-center z-10 p-4 text-white">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 leading-tight">
              Welcome to our <br/> co-ownership community.
            </h1>
          </div>
        </div>

        {/* Right Section (Sign-in Form) */}
        <div className="flex-1 p-6 sm:p-10 w-full flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-main-100">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-8 font-light text-sm">
            Sign in to continue your co-ownership journey.
          </p>

          {/* Message Box */}
          {message && (
            <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-lg mb-6 shadow-md transition-opacity duration-300">
              {message}
            </div>
          )}

          {/* Sign-in Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className='flex justify-center items-center bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                <input
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-gray-200 placeholder-gray-500 focus:outline-none"
                />
                <div onClick={() => setPasswordShown(!passwordShown)} className='bg-gray-200 mr-3'>
                  {
                    !passwordShown
                    ?
                    <Eye className='hover:scale-95'/>
                    :
                    <EyeOff className='hover:scale-95'/>
                  }
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right text-sm">
              <a href="/forgot-password"className="font-medium text-blue-500 hover:text-blue-400">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-main-100 to-cyan-900 hover:from-cyan-800 hover:to-main-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200"
              >
                {
                    loading
                    ?
                    <Loader className='animate-spin'/>
                    :
                    "Sign In"
                }
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-light text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Sign-in Button */}
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-300 shadow-sm text-lg font-bold text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-200"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V14.46h6.814a7.99 7.99 0 0 1-2.903 5.253A8.001 8.001 0 0 1 12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8c2.404 0 4.542 1.056 6.075 2.766L17.5 4.998c-1.503-1.442-3.6-2.28-5.5-2.28-4.97 0-9 4.03-9 9s4.03 9 9 9c3.966 0 7.378-2.618 8.448-6.155H12.24z" />
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/sign-up" className="font-medium text-blue-500 hover:text-blue-400">
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
};

export default SignIn;
