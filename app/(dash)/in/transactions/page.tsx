
import ClientSubTransactions from "@/components/ClientSubTransactions"
import HeaderBox from "@/components/HeaderBox"
import VendorSubTransactions from "@/components/VendorSubTransactions"
import { getClientSubscriptionTransactionById, getVendorSubscriptionTransactionById } from "@/lib/actions/transactions.action"
import { getAuthenticatedUser } from "@/lib/actions/user.action"
import { User } from "@/types"

async function page() {
  const user: User = await getAuthenticatedUser()
  const userRole = user?.whoId?.split(";")[0];

  let vendorSubTransactions = [] as any
  let clientSubTransactions = [] as any
  // let agent = {} as any
  
  switch (userRole) {
    case "Developer":
      vendorSubTransactions = await getVendorSubscriptionTransactionById(user?.whoId?.split(";")[1])
      break;
    case "Buyer":
      clientSubTransactions = await getClientSubscriptionTransactionById(user?.whoId?.split(";")[1])
      break;
    // case "Agent":
    //   agent = await getAgentById(user?.whoId?.split(";")[1])
    //   break;
    default:
      break;
  }

  // console.log(vendorSubTransactions);
  
  return (
    <div className="container h-[90vh]">
      <HeaderBox title="Transactions" user="" subtext="All your transactions access"/>

      {userRole === "Developer" && <VendorSubTransactions  vendorSubTransactions={vendorSubTransactions.transactions}/>}
      {userRole === "Buyer" && <ClientSubTransactions clientSubTransactions={clientSubTransactions.transactions}/>}
    </div>
  )
}

export default page
export const dynamic = "force-dynamic";
