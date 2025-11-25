import PricingPage from '@/components/pricing/PricingPage'
import { getBuyerById } from '@/lib/actions/customers.actions';
import { getClientSubscriptionDetails } from '@/lib/actions/subscription.action'
import { getAuthenticatedUser } from '@/lib/actions/user.action';
import React from 'react'

async function page() {

  const user: any = await getAuthenticatedUser();
  const client = await getBuyerById(user != 0 && user?.whoId.split(";")[0] === "Buyer" ? user?.whoId.split(";")[1] : 0)
  const clientSubscription = await getClientSubscriptionDetails()

  return (
    <div>
      <PricingPage clientSubscription={clientSubscription} client={client ? client.data : []} />
    </div>
  )
}

export default page;
export const dynamic = "force-dynamic";
