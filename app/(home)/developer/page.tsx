'use client'

import React, { Suspense } from 'react'
import Link from 'next/link';


const Developer = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <section className='h-full'>
        <div className="container">
          <div className="col-md-10 mx-auto pt-[100px]">
            <div className='w-full bg-white border border-gray-400 shadow-sm shadow-gray-400 p-5'>
              <h1 className='font-bold text-20 mb-5'>Steps to Submitting Properties</h1>
              <div className='row my-3'>
                <div className='col-md-6'>
                  <ol className='ol'>
                    <li>Create an Account</li>
                    <li>Access Your Control Panel</li>
                    <li>Complete Your Profile</li>
                    <li>Choose A plan</li>
                    <li>Upload Your Properties</li>
                  </ol>
                </div>

                <div className='col-md-6'>
                  <ul className='space-y-4'>
                    <li className='flex justify-center items-'>
                       <p>Your initial data is required and needed by our system to recognize you as a partner.</p>
                    </li>
                    <li className='flex justify-center items-'>
                       <p>You will be granted access to your dashboard after a successful signup and verification.</p>
                    </li>
                    <li className='flex justify-center items-'>
                       <p>You will be required to complete your profile upon dashboard access to help get and store your full information</p>
                    </li>
                    <li className='flex justify-center items-'>
                       <p>You would then need to choose a plan already made available in your dashboard so we can properly map your your account to enjoy appropriate functionalities and tools on the spacematch platform.</p>
                    </li>
                    <li className='flex justify-center items-'>
                       <p>After which you can go ahead to upload your properties for publishing to available clients who would be interested to make purchase</p>
                    </li>
                  </ul>
                </div>

                <div className='border-t border-dotted border-gray-300 my-3'></div>
                <div className='flex justify-center items-center w-full'>
                  <Link 
                    href={{
                        pathname: "/sign-up",
                        query: {who: "developer"}
                      }}
                    className='text-center w-full px-4 py-2 mt-2 bg-main-100 hover:shadow-md shadow-gray-400 text-white rounded-xl'>
                      Proceed to Create an Account
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </Suspense>
      
  )
}


export default Developer