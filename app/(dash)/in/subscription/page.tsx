
import ClientSubscription from '@/components/ClientSubscription'
import VendorSubscription from '@/components/VendorSubscription'
import { getClientSubscriptionDetails, getVendorSubscriptionDetails } from '@/lib/actions/subscription.action'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { User } from '@/types'
import Image from 'next/image'

const SubscriptionPage = async () => {
  const user: User = await getAuthenticatedUser()
  const clientSubscriptionCard = await getClientSubscriptionDetails()
  const vendorSubscriptionCard = await getVendorSubscriptionDetails()


  if (!user && !vendorSubscriptionCard && !clientSubscriptionCard) {
    return (
      <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
        <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
      </div>
    )
  }

  // Helper variable for cleaner rendering logic
  const userRole = user?.whoId?.split(";")[0];


  return (
    <section className='flex-1 justify-center items-center min-h-screen py-5'>
      {userRole === "Developer" &&  <VendorSubscription user={user} subscriptionCard={vendorSubscriptionCard} />}
      {userRole === "Buyer" &&  <ClientSubscription user={user} subscriptionCard={clientSubscriptionCard} />}
    </section>
  )
}

export default SubscriptionPage
export const dynamic = "force-dynamic";
