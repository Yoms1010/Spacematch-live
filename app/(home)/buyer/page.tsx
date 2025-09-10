'use client'

// import { Canvas, extend } from '@react-three/fiber';
// import { Leva } from 'leva';
import { TransitionMaterial } from '@/components/TransitionMaterial';
// import {ModernKitchen} from '@/components/ModernKitchen';
// import { OrbitControls} from '@react-three/drei';
// import CanvasLoader from "@/components/CanvasLoader"
import React, { Suspense } from 'react'
import { CiLock, CiUnlock } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import Link from 'next/link';

// extend({
//   TransitionMaterial,
// });



// const sizes = calculateSizes(isSmall, isMobile, isTablet);

const Buyer = () => {

  return (
    <section className='container '>
      <div className="col-md-10 mx-auto pt-[100px]">
        <div className='w-full bg-white border border-gray-400 shadow-sm shadow-gray-400 p-5'>
          <h1 className='font-bold text-20 mb-5'>Steps to being a spacematch client</h1>
          <div className='row my-3'>
            <div className='col-md-6'>
              <ol className='ol'>
                <li>Create an Account</li>
                <li>Access Your Control Panel</li>
                <li>Complete Your Profile</li>
                <li>Choose A plan</li>
                <li>Match preferred property</li>
                <li>Property Purchase</li>
              </ol>
            </div>

            <div className='col-md-6'>
              <ul className='space-y-4'>
                <li className=''>
                 <p>Your initial data is required and needed by our system to recognize you as a partner.</p>
                </li>
                <li className=''>
                  <p>You will be granted access to your dashboard after a successful signup and verification.</p>
                </li>
                <li className=''>
                   <p>You will be required to complete your profile upon dashboard access to help get and store your full information</p>
                </li>
                <li className=''>
                   <p>You would then need to choose a plan already made available in your dashboard so we can properly map your your account to enjoy appropriate functionalities and tools on the spacematch platform.</p>
                </li>
                <li className=''>
                  <p>Property matching access will be granted after subscription has been successfully done</p>
                </li>
                <li className=''>
                  <p>Then a purchase can be initiated.</p>
                </li>
              </ul>
            </div>

            <div className='border-t border-dotted border-gray-300 my-3'></div>
            <div className='flex justify-center items-center w-full'>
              <Link 
                href={{
                    pathname: "/sign-up",
                    query: {who: "buyer"}
                  }}
                className='text-center w-full px-4 py-2 mt-2 bg-main-100 hover:shadow-md shadow-gray-400 text-white rounded-xl'>
                  Proceed to Create an Account
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      {/* <div className="container-fluid h-full w-full flex justify-center items-center">
          <Leva hidden/>
          <Canvas className='w-full'>
            <Suspense fallback={<CanvasLoader/>}>
                  <ModernKitchen />
                  <OrbitControls
                    enableZoom={true}
                    rotateSpeed={2}
                    autoRotate={false}
                    autoRotateSpeed={2}
                  />
                <ambientLight intensity={1} />
              
            </Suspense>
          </Canvas>
      </div>

        <div className="buyer-info">
          <div className=''>
            <h2 className='font-bold'>Discover Your Space</h2>
              <ul className='flex flex-col gap-1 my-5 text-sm'>
                <li>1. Create an account</li>
                <li>2. Access your dashboard</li>
                <li>3. Complete your profile</li>
                <li>4. Choose a plan</li>
                <li>5. Get access to our AI home development generator</li>
                <li>Virtual develop property to your desire</li>
                <li>------------------------------------------</li>
                <li>FOR LAPTOPS</li>
                <li>Place two fingers on your trackpad, move up to zoomout, move down to zoomin</li>
                <li>Click on the 3D and hold, while still holding move left and right.</li>
                <li>------------------------------------------</li>
                <li>FOR MOBILE DEVICES</li>
                <li>Use your fingers to ZoomIn and ZoomOut</li>
                <li>Swipe on the 3D object horizontally to move the object left and right</li>
              </ul>
            <Link
              href={{
                pathname: "/sign-up",
                query: {who: "buyer"}
              }}
              className='p-2 text-main-100 rounded hover:shadow-xl w-full mt-4 text-center'
            >
              Sign up here...
            </Link>
          </div>
        </div> */}
    </section>
  )
}

export default Buyer;