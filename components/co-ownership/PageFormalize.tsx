import { useStateContext } from "@/context/ContextProvider";

const PageFormalize = ({ onNext, userState, user }: { onNext: any, userState: any, user: any }) => {

    const {goalPlan} = useStateContext()
    console.log(goalPlan);
    

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Formalize Your Co-Ownership</h2>
            <p className="text-gray-600 mb-6">Review the terms of your partnership agreement. This legal framework ensures everyone is aligned and protected.</p>
            <div className="border rounded-lg p-6 bg-gray-50 shadow-inner max-h-72 overflow-y-auto">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Co-Ownership Agreement Summary</h3>
                <p className="font-medium text-gray-700">Partners:</p>
                <ul className="list-disc list-inside mb-4 ml-4 text-gray-600">
                    <li>You ({user.name})</li>
                    <li><span>{userState.partner.split(";")[1]}</span></li>
                </ul>
                <p className="font-medium text-gray-700">Project:</p>
                <ul className="list-disc list-inside mb-4 ml-4 text-gray-600">
                    <li>Type: <span>{goalPlan.project_type}</span></li>
                    <li>Location: <span>{goalPlan.lga}, {goalPlan.state}. {goalPlan.country}</span></li>
                </ul>
                <p className="font-medium text-gray-700">Key Terms:</p>
                <ul className="list-disc list-inside mb-4 ml-4 text-gray-600">
                    <li>50/50 Equity Split</li>
                    <li>Shared maintenance responsibilities</li>
                    <li>Right of first refusal for buyout</li>
                    <li>... (Full legal document would be attached) ...</li>
                </ul>
            </div>
            <button 
                onClick={() => onNext('page-plan')}
                className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Agree & Plan Project
            </button>
        </div>
    )
};

export default PageFormalize;