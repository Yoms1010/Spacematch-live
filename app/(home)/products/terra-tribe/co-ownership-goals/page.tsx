import CoownershipGoalsPage from '@/components/solutions/terra-tribe/CoowernershipGoals'
import { getBuyerById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { ClientProps } from '@/types'
import React from 'react'

async function page() {
  const user = await getAuthenticatedUser()
  const client = await getBuyerById(user != 0 && user?.whoId.split(";")[0] === "Buyer" ? user?.whoId.split(";")[1] : 0)
  return (
    <div>
      <CoownershipGoalsPage client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
