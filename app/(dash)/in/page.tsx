
import ProfileCompletionButton from '@/components/cardsui/ProfileCompletionButton';
import HeaderBox from '@/components/HeaderBox';
import { buyerData } from '@/constants';
import { getAgents, getClients, getVendors } from '@/lib/actions/customers.actions';
import { getAllProperties, getVendorProperties } from '@/lib/actions/property.action';
import { getAuthenticatedUser, isAthenticated } from '@/lib/actions/user.action';
import Agent from '@/sections/Agent';
import Buyer from '@/sections/Buyer';
import Developer from '@/sections/Developer';
import SuperAdmin from '@/sections/SuperAdmin';
import Image from 'next/image'


// Best Practice: Define a type for your user object to avoid using 'any'.
interface User {
  id: number;
  name: string;
  email: string;
  whoId: string;
  complete: 'Yes' | 'No';
  client_sc_id: number;
  isSubscribed: string; 
  plan: string;
  // Add other properties as needed
}

const Home = async () => {

  const user: User | any = await getAuthenticatedUser()
  const property = await getVendorProperties(user?.whoId.split(";")[1])
  const clients = await getClients()
  const vendors = await getVendors()
  const agents = await getAgents()
  const properties = await getAllProperties()
  const isUserAthenticated = await isAthenticated()


  // Render a single, centralized loading state.
  if (!user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-lg w-full">
        <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-bounce shadow-sm rounded-full" />
        <p className="mt-4">Loading your dashboard...</p>
      </div>
    );
  }
  
  // A fallback for when the user is not loaded for some reason
  if (!user) {
     return <div className="h-screen flex justify-center items-center">Could not load user data.</div>;
  }

  // Helper variable for cleaner rendering logic
  const userRole = user?.whoId?.split(";")[0];

  return (
    <section className='home' suppressHydrationWarning>
      <div className='home-content'>
        {user.complete === "No" && (
          <ProfileCompletionButton/>
        )}
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user.name.split(" ")[0]}
            subtext="Accessing and managing your information..."
          />
        </header>

        <div className='container'>
          {userRole === "SuperAdmin" && <SuperAdmin vendors={vendors} clients={clients} agents={agents} properties={properties} />}
          {userRole === "Developer" && <Developer propertyData={property || []} userInfo={user} />}
          {userRole === "Buyer" && <Buyer data={buyerData || []} userInfo={user} />}
          {userRole === "Agent" && <Agent/>}
        </div>
      </div>
    </section>
  );
}

export default Home;
export const dynamic = "force-dynamic";

