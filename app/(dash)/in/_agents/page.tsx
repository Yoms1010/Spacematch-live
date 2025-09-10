'use client'


import axiosClient from '@/axios-client';
import Agents4Buyers from '@/components/Agents4Buyers';
import Agents4Superadmin from '@/components/Agents4Superadmin';
import HeaderBox from '@/components/HeaderBox';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function Agents() {
    const [user, setUser] = useState<any>()
    
      useEffect(() => {
        const fetchCurrentUser = async () => {
          // Fetch the current user's details here
          await axiosClient.get("/user")
          .then((data) => {
            // Set the fetched user data in the state
            setUser(data.data);
          })
          .catch((error) => {
            console.log(error)
          });
        }

        fetchCurrentUser();
      }, [])

      if (!user) {
        return (
            <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
              <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
            </div>
          )
      }

  return (
    <div>
        {/* <HeaderBox */}
        <header className='p-5'>
          <HeaderBox
            title='Agents Table'
            subtext='Details of all registered Vendors'
          />
        </header>
        {
          user ? 
          (
            user.whoId.split(";")[0] === "SuperAdmin"
            ?
            (<Agents4Superadmin/>)
            :
            user && user.whoId.split(";")[0] === "Developer"
            ?
            ("")
            :
            user && user.whoId.split(";")[0] === "Buyer"
            ?
            <Agents4Buyers buyerId={user && user.whoId.split(";")[1]}/>
            :
            <div></div>
          )
          :
          <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
            <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
          </div>
        }
    </div>
  )
}

export default Agents
