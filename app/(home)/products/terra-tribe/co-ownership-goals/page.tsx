import CoownershipGoalsPage from '@/components/solutions/terra-tribe/CoowernershipGoals'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps, User } from '@/types'
import React from 'react'

async function page() {
  const user: User = await getAuthenticatedUser()
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
    <div>
      <CoownershipGoalsPage client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
