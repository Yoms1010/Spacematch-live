'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation';
import FlexiHabitat from '@/components/solutions/flexi-habitat/FlexiHabitat'
import TraditionalBuildings from '@/components/solutions/traditional-buildings/TraditionalBuildings'


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
          <TraditionalBuildings/>
        }
      </div>
      <div className=''>
        {/* Property Solutions - {type} */}
      </div>
    </section>
  )
}

export default page
