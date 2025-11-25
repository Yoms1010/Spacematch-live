import { useRef } from "react";
import { toast } from "react-toastify";

const PagePlan = ({ onNext, userState }: { onNext: any, userState: any }) => {

    const finalizeCoownershipAgreementRef = useRef<any>(null)
    const secureProjectDepositRef = useRef<any>(null)
    const vetLandListingsRef = useRef<any>(null)
    const dueDilligenceRef = useRef<any>(null)

    const handleProjectMilestones = () => {
        const payLoad = {
            stepOne: finalizeCoownershipAgreementRef.current.value,
            stepTwo: secureProjectDepositRef.current.value,
            stepThree: vetLandListingsRef.current.value,
            stepFour: dueDilligenceRef.current.value
        }
        typeof window != undefined && window.localStorage.setItem("project_milestones", JSON.stringify(payLoad))
        toast.success("Project Milestones saved...")
        onNext("page-deposit")
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan & Launch Project</h2>
            <p className="text-gray-600 mb-6">You and {userState.partner.split(";")[1]} can now use this collaborative space to plan your project before acquiring the land.</p>
            <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Project Milestones</h3>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <input type="checkbox" ref={finalizeCoownershipAgreementRef} value={"Finalize Co-Ownership Agreement"} className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" defaultChecked disabled />
                        <label className="ml-3 text-gray-700">Finalize Co-Ownership Agreement</label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" ref={secureProjectDepositRef} value={"Secure Project Deposits"} className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" defaultChecked disabled />
                        <label className="ml-3 text-gray-700">Secure Project Deposits</label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" ref={vetLandListingsRef} value={"Identify & Vet Land Listings"} className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                        <label className="ml-3 text-gray-700">Identify & Vet Land Listings</label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" ref={dueDilligenceRef} value={"Schedule Land Surveys & Due Diligence"} className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                        <label className="ml-3 text-gray-700">Schedule Land Surveys & Due Diligence</label>
                    </li>
                </ul>
            </div>
            <button 
                onClick={handleProjectMilestones}
                className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Secure Deposit Payment
            </button>
        </div>
    );

}

export default PagePlan;