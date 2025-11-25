import { useStateContext } from "@/context/ContextProvider";
import axios from "axios";
import { useState } from "react";

const PageDeposit = ({ onNext, user }: { onNext: any, user: any }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isDepositMade, setIsDepositMade] = useState(false)
    const { goalMatches } = useStateContext()

    console.log(user, goalMatches);


    const handleDepositPayment = async (price: number, currency: string) => {
        const requestData = {
            email: user.email,
            amount: price * 100,
            currency,
        }

        setIsLoading(true)
        //@ts-expect-error
        const squadInstance = await new squad({
            onClose: () => console.log("Widget closed"),
            onLoad: () => console.log("Widget loaded successfully"),
            onSuccess: (res: any) => { onSquadcoPaySuccess(res); console.log(`Linked successfully`, res); },
            key: process.env.NEXT_PUBLIC_SQUADCO_PAY_API_KEY, //NEXT_PUBLIC_SQUADCO_SANDBOX_API_KEY,
            email: requestData.email,
            amount: requestData.amount,
            currency_code: requestData.currency
        });
        squadInstance.setup();
        squadInstance.open();
        setIsLoading(false)
    }

    const onSquadcoPaySuccess = async (res: any) => {
        const payLoad = {
            client_id: user.whoId.split(";")[1],
            client_name: user.name,
            partner_id: goalMatches.partnerId,
            partner_name: goalMatches.partnerName,
            title: "Standard",
            amount: res.amount / 100,
            currency: res.currency_code,
            transaction_ref: res.transaction_ref,
            payment_option: "card",
            status: "successful",
            active: "Yes"
        }

        const response = await axios.post("/api/", payLoad)
        console.log(response);
        setIsDepositMade(true)
        onNext("page-deposit")
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Secure Deposit Payment</h2>
            <p className="text-gray-600 mb-6">A small, refundable deposit secures your partnership and unlocks the land acquisition tools.</p>
            <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Deposit Summary</h3>
                <p className="text-gray-600">Your Share (50%): <span className="font-bold text-2xl text-gray-900">₦250,000</span></p>
                <p className="text-gray-600 mt-2">Partner's Share (50%): <span className="text-green-600 font-medium">Paid</span></p>

                <button
                    onClick={() => handleDepositPayment(2500000, "NGN")}
                    className="bg-green-600 mt-10 hover:bg-green-700 p-2 rounded-bl-xl rounded-tr-xl text-white w-full">
                    Pay Deposit (₦2,500,000)
                </button>
                {/* <form className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" id="card" defaultValue="**** **** **** 4242" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3" disabled />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry</label>
                            <input type="text" id="expiry" defaultValue="12 / 28" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3" disabled />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                            <input type="text" id="cvc" defaultValue="***" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3" disabled />
                        </div>
                    </div>
                </form> */}
            </div>
            {/* THIS IS THE SEAMLESS TRANSITION */}
            <button
                onClick={() => onNext('page-acquire-land-start')}
                disabled={!isDepositMade}
                className={`action-btn w-full mt-6 bg-main-100 ${isDepositMade && "hover:bg-main-100/80"} text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300`}
            >
                Start Acquiring Land
            </button>
        </div>
    );
}
export default PageDeposit;