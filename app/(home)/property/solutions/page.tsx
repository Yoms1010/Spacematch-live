'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation';
import PrefabHomes from '@/components/solutions/prefab-homes/PrefabHomes'
import TraditionalBuildings from '@/components/solutions/traditional-buildings/TraditionalBuildings'


function page() {

  const searchParam = useSearchParams()
  const type = searchParam.get("type")


  return (
    <section className=''>
      <div className='design'>
        {
          type == "prefab-homes"
          ?
          <PrefabHomes/>
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
