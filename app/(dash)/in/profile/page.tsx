
import AgentProfile from '@/components/AgentProfile';
import BuyerProfile from '@/components/BuyerProfile';
import DeveloperProfile from '@/components/DeveloperProfile';
import { getAgentById, getBuyerById, getDeveloperById } from '@/lib/actions/customers.actions';
import { getAuthenticatedUser } from '@/lib/actions/user.action';
import { User } from '@/types';

const Profile = async () => {

  const user: User = await getAuthenticatedUser()
  const userRole = user?.whoId?.split(";")[0]
  let developer = {} as any
  let buyer = {} as any
  let agent = {} as any
  
  switch (userRole) {
    case "Developer":
      developer = await getDeveloperById(user?.whoId?.split(";")[1])
      break;
    case "Buyer":
      buyer = await getBuyerById(user?.whoId?.split(";")[1])
      break;
    case "Agent":
      agent = await getAgentById(user?.whoId?.split(";")[1])
      break;
  
    default:
      break;
  }


  return (
    <div className='container my-5 px-3'>
      {userRole === "Developer" && <DeveloperProfile developer={developer} subscriptionPlan={user.plan}/>}
      {userRole === "Buyer" && <BuyerProfile buyer={buyer} subscriptionPlan={user.plan}/>}
      {userRole === "Agent" && <AgentProfile agent={agent}/> }
    </div>
  )
}

export default Profile
export const dynamic = "force-dynamic";
