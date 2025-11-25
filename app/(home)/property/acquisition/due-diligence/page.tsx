import DueDiligencePage from '@/components/acquisition/DueDiligencePage'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps, User } from '@/types'
import React from 'react'

async function page() {
  const user = await getAuthenticatedUser()
  let client: ClientProps | null = null
  if (user?.whoId) {
    const [whoName, rawId] = user.whoId.split(";");
    if (whoName === "Buyer" && rawId) {
      client = await getBuyerById(rawId);
    } else {
      client = await getBuyerById(0);
    }
  }

  return (
    <DueDiligencePage client={client ? client.data : []} />
  )
}

export default page;
export const dynamic = "force-dynamic";
