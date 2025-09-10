import PropertyUpload from '@/components/property/PropertyUpload'
import { getAgentById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { User } from '@/types'
import Image from 'next/image'
import React, { Suspense } from 'react'

async function page() {

  const user: User = await getAuthenticatedUser()
  // const agent = await getAgentById(user?.whoId?.split(";")[1])


  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center text-3xl font-bold w-full">
          <Image
            src="https://placehold.co/100x100/333/FFF?text=LOGO"
            width={100}
            height={100}
            alt="logo"
            className="animate-spin shadow-sm rounded-full"
          />
        </div>
      }
    >
      <div suppressHydrationWarning={true}>
        <PropertyUpload user={user}/>
      </div>
    </Suspense>
  )
}

export default page
export const dynamic = "force-dynamic";
