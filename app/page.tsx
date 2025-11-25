import HomePage from '@/components/home/HomePage'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps } from '@/types'
import React from 'react'

async function page() {

  const user = await getAuthenticatedUser()
  const client = await getBuyerById(user != 0 && user?.whoId.split(";")[0] === "Buyer" ? user?.whoId.split(";")[1] : 0)

  return (
    <HomePage client={client ? client.data : []} />
  )
}

export default page;
export const dynamic = "force-dynamic";
