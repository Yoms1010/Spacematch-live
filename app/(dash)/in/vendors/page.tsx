
import HeaderBox from '@/components/HeaderBox'
import React, { Suspense } from 'react'
import Image from 'next/image';
import { getVendors } from '@/lib/actions/customers.actions';
import Vendors from '@/components/in-components/superadmin/Vendors';


async function page() {

  const vendors = await getVendors()

  return (
    <Suspense
      fallback={<div className="h-screen flex justify-center items-center text-30 font-bold w-full">
      <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-spin shadow-sm rounded-full"/>
      </div>}
    >
      <div className="m-5">
        <HeaderBox
              title='Vendors Table'
              subtext='Details of all registered Vendors'
          />
          <div className='p-3 bg-white overflow-x-scroll max-w-[1130px]'>
            <Vendors vendors={vendors}/>
          </div>
      </div>
    </Suspense>
  )
}

export default page
export const dynamic = "force-dynamic";