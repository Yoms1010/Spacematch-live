'use client'

import axiosClient from '@/axios-client';
import BuyerProfile from '@/components/BuyerProfile';
import DeveloperProfile from '@/components/DeveloperProfile';
import HeaderBox from '@/components/HeaderBox';
import React, { useEffect, useState } from 'react'
import AgentProfile from '../../../../components/AgentProfile';

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("current_user")!)


  return (
    <div className='container my-5 px-3'>
      {
        user && user.whoId.split(";")[0] === "Developer"
        ?
        (<DeveloperProfile/>)
        :
        user && user.whoId.split(";")[0] === "Buyer"
        ?
        (<BuyerProfile/>)
        :
        user && user.whoId.split(";")[0] === "Agent"
        ?
        (<AgentProfile/>)
        :
        ""
      }
    
    </div>
  )
}

export default Profile
