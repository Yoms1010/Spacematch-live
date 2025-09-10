
import AgentSettings from '@/components/AgentSettings'
import BuyerSettings from '@/components/BuyerSettings'
import DeveloperSettings from '@/components/DeveloperSettings'
import HeaderBox from '@/components/HeaderBox'
import { getAgentById, getBuyerById, getDeveloperById } from '@/lib/actions/customers.actions'
import { getAuthenticatedUser } from '@/lib/actions/user.action'
import { User } from '@/types'

const Settings = async () => {

const user: User = await getAuthenticatedUser()

// get user role 
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

// console.log(agent);


  return (
    <div className='container my-5 px-3'>
      <HeaderBox
        title='Settings'
        subtext='User Details and Settings'
      />

        {userRole === "Developer" && <DeveloperSettings user={user} developer={developer}/>}
        {userRole === "Buyer" && <BuyerSettings user={user} buyer={buyer}/>}
        {userRole === "Agent" && <AgentSettings user={user} agent={agent}/>}
    </div>
  )
}

export default Settings
export const dynamic = "force-dynamic";