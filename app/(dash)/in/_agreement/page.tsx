'use client'


import BuyerAgreement from '@/components/BuyerAgreement'
import DeveloperAgreement from '@/components/DeveloperAgreement'
import HeaderBox from '@/components/HeaderBox'
import React, { Suspense } from 'react'

function Agreement() {

  const user = JSON.parse(localStorage.getItem("current_user")!)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className='px-5 py-2'>
        <HeaderBox
          title='Partnership Agreement'
          subtext='Sales partnership agreement'
        />

        {
          user?.whoId?.split(";")[0] === "SuperAdmin"
          ?
          ("")
          : 
          user?.whoId?.split(";")[0] === "Developer"
          ?
          (<DeveloperAgreement currentUser={user && user}/>)
          :
          user?.whoId?.split(";")[0] === "Buyer"
          ?
          (<BuyerAgreement currentUser={user && user}/>)
          :
          ""
        }
    </section>
    </Suspense>
  )
}

export default Agreement
