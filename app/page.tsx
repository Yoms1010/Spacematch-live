import HomePage from '@/components/home/HomePage'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps, User } from '@/types'
import Image from 'next/image'
import React, { Suspense } from 'react'

async function page() {

  const user: User = await getAuthenticatedUser()
  let client: ClientProps | null = null
  if (user.length > 0) {
    const whoId = user ? user?.whoId.split(";")[0] : [] as any
    const whoName = user ? user?.whoId.split(";")[1] : [] as any
    client = await getBuyerById(whoName === "Buyer" ? whoId : 0)
  }

  // console.log(user);


  return (
    <Suspense fallback={
      <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
        <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full" />
      </div>
    }>
      <HomePage client={client ? client.data : []} />
    </Suspense>

  )
}

export default page;
export const dynamic = "force-dynamic";
