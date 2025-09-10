"use client"

import axiosClient from '@/axios-client'
import BuyerChatRoom from '@/sections/BuyerChatRoom'
import AgentChatRoom from '@/sections/AgentChatRoom'
import React, { Suspense, useEffect, useState } from 'react'
import { Loader } from 'lucide-react'

const AgentToBuyerChat = () => {

  const [user, setUser] = useState<any>()

  useEffect(() => {
    // const fetchBuyerChat = () => {
      axiosClient.get(`/user`)
       .then(response => {
          setUser(response.data)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    // }
  }, [])

  // console.log(user.whoId);

  return (
    <Suspense fallback={<div className="h-screen flex justify-center items-center text-30 font-bold"><Loader className='animate-spin'/> Loading...</div>}>
      <section className='min-h-[90vh] p-3'>
        {
          user && user.whoId.split(";")[0] == "Buyer"
            ?
          <BuyerChatRoom id={ user.whoId.split(";")[1] }/>
            :
          (
            user && user.whoId.split(";")[0] == "Agent"
            &&
            <AgentChatRoom id={ user.whoId.split(";")[1] }/>
          )
        }
      </section>
    </Suspense>
  )
}

export default AgentToBuyerChat