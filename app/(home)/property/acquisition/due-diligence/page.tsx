import DueDiligencePage from '@/components/acquisition/DueDiligencePage'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps, User } from '@/types'
import React from 'react'

async function page() {
  const user: User = await getAuthenticatedUser()
  let client: ClientProps | null = null
  if (user) {
    const whoId = user?.whoId.split(";")[1]
    const whoName = user?.whoId.split(";")[0]
    client = await getBuyerById(whoName === "Buyer" ? whoId : 0)
  }

  return (
    <DueDiligencePage client={client ? client.data : []} />
  )
}

export default page;
export const dynamic = "force-dynamic";
