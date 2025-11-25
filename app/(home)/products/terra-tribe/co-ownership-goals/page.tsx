import CoownershipGoalsPage from '@/components/solutions/terra-tribe/CoowernershipGoals'
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
    <div>
      <CoownershipGoalsPage client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
