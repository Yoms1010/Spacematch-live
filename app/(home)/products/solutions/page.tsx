'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation';
import FlexiHabitat from '@/components/solutions/flexi-habitat/FlexiHabitat'
import TerraTribe from '@/components/solutions/terra-tribe/TerraTribe';


function page() {

  const searchParam = useSearchParams()
  const type = searchParam.get("type")


  return (
    <section className=''>
      <div className='design'>
        {
          type == "flexihabitat"
          ?
          <FlexiHabitat/>
          : 
          type == "terratribe"
          ?
          <TerraTribe/>
          :
          <></>
        }
      </div>
      <div className=''>
        {/* Property Solutions - {type} */}
      </div>
    </section>
  )
}

export default page
