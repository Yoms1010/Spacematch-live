'use client'

import { useStateContext } from "@/context/ContextProvider";
import { Key } from "react";
import { toast } from "react-toastify";

const PageMatches = ({ onNext, setUserState }: { onNext: any, setUserState: any}) => {

    const {goalMatches} = useStateContext()
    if (!goalMatches){ toast.warning("Kindly provide your coownership goals again"); return onNext('page-goals');} 

    const handleConnect = (partnerId: number, partnerName: string) => {
        setUserState((prevState: any) => ({ ...prevState, partner: `${partnerId};${partnerName}` }));
        onNext('page-chat');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Partners</h2>
            <p className="text-gray-600 mb-6">We found <b>{goalMatches.length}</b> potential partners based on your goals. (Click "Connect" to proceed).</p>
            <div className="space-y-4">
                {/* Mock Partner 1 */}
                {
                    goalMatches.map((item: any, i: Key) => (
                        <div key={i} className="border border-gray-200 p-4 rounded-lg flex items-center justify-between shadow-sm">
                            <div className="flex items-center space-x-4">
                                <div className="flex justify-center items-center text-blue-500 font-bold text-2xl w-16 h-16 rounded-full bg-gray-200 shadow-md">
                                    {item.client_name[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{item.client_name}.</h3>
                                    <p className="text-gray-600">Also looking for land for <span className="font-medium text-gray-800">{item.project_type}</span> in <span className="font-medium text-gray-800">{item.lga}, {item.state}. {item.country}</span>.</p>
                                    <p className={`font-medium ${((item.percentage * 100 ) / 4) < 50 ? "text-red-500" : "text-green-600"}`}>{(item.percentage * 100 ) / 4}% Match</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleConnect(item.client_id, item.client_name)}
                                className="action-btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg shadow transition duration-300"
                            >
                                Connect
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PageMatches;