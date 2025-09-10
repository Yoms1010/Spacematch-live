'use client'


import axiosClient from '@/axios-client';
import AgentMatches from '@/components/AgentMatches';
import BuyerMatches from '@/components/BuyerMatches';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


function Matches() {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await axiosClient.get("/user")
      .then((data) => {
        setUser(data.data)
          
      })
      .catch(err => console.log(err));
    }

    fetchCurrentUser()
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
      {
        user && user?.whoId?.split(";")[0] == "Buyer"
        ?
        <BuyerMatches/>
        :
        user && user?.whoId?.split(";")[0] == "Agent"
        &&
        (
          <AgentMatches agentId={user && user?.whoId?.split(";")[1]}/> 
        )
      }
    </div>
  )
}

export default Matches