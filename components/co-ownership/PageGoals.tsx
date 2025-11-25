
'use client'

import { nigeria } from "@/constants";
import { useStateContext } from "@/context/ContextProvider";
import { fetchOrCreateGoalsMatches } from "@/lib/actions/coownership.action";
import { User } from "@/types";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";
import { toast } from "react-toastify";

const PageGoals = ({ onNext, userState, setUserState, user, client }: { onNext: any, userState: any, setUserState: any , user: User|any, client:any}) => {

    const router = useRouter();
    const {setGoalPlan, setGoalMatches} = useStateContext()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setUserState((prevState : any) => ({
            ...prevState,
            goals: {
                ...prevState.goals,
                [id]: value
            }
        }));
    };

    const lgasForState = userState.goals.state
        ? nigeria.find((s) => s.state === userState.goals.state)?.lga || []
        : [];

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        try {
            if (client === null) {
                if (confirm("You are yet to login as a client. Kindly login to your client account..")) {
                    typeof window != undefined && window.localStorage.setItem("callerpage", "/property/start-coownership")
                    return router.replace("/sign-in")
                }
                return toast.error("You need to login to proceed...")
            }


            if (!confirm("The system is about to check to see if there is a match for your preference, and will instantly create it should incase there's presently no match. So is the provided information ok by you?")) {
                return toast.warning("You can reenter the information and proceed...")
            }

            const payLoad = {
                client_id: client.data.id,
                client_name: client.data.name,
                lga: userState.goals.lga,
                state: userState.goals.state,
                country: "Nigeria", //userState.goals.country,
                project_type: userState.goals.projectType,
                budget: userState.goals.budget
            }

            setIsLoading(true)
            const response: any = await fetchOrCreateGoalsMatches(payLoad);
            console.log(response);
            setIsLoading(false)
            if (response && response.success) {
                if (response.status === 200) {
                    const percentage = getMatchPercentage(response.data, payLoad)
                    setGoalPlan(payLoad)
                    setGoalMatches(percentage)
                    toast.success("Matches found. Proceeding...")
                    setTimeout(() => {
                        onNext('page-matches');
                    }, 900)
                }else{
                    console.log(response);
                    toast.success("No matches found for your goal. The system has create ...")
                    setTimeout(() => {
                        //onNext('page-matches');
                    }, 900)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(`Error: An error occurred`)
        }
    };

    const getMatchPercentage = (data: any, payLoad: any) => {
        let percentage = data.map((item: any) => (
            {
                client_id: item.client_id,
                client_name: item.client_name,
                lga: item.lga,
                state: item.state,
                country: item.country,
                percentage: (item.lga == payLoad.lga ? 1 : 0) + (item.state == payLoad.state ? 1 : 0) + (item.country == payLoad.country ? 1 : 0) + (item.project_type == payLoad.project_type ? 1 : 0)
            }
        ));
        
        return percentage;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Define Your Goals</h2>
            <p className="text-gray-600 mb-6">Tell us what you're looking for. This helps us find the perfect partners for your project.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-2'>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <select 
                            id="state" 
                            value={userState.goals.state}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none sm:text-sm p-3"
                        >
                            <option value="">Select a state</option>
                            {
                                nigeria.map((item, i: Key) => (
                                    <option value={item.state} key={i}>{item.state}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="lga" className="block text-sm font-medium text-gray-700">Local Government Area</label>
                        <select 
                            id="lga" 
                            value={userState.goals.lga}
                            onChange={handleChange}
                            required
                            onClick={() => {!userState.goals.state && toast.warning("Select State first...")}}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none sm:text-sm p-3"
                        >
                            {
                                !userState.goals.state
                                ?
                                <option value="">Select LGA</option>
                                :
                                <>
                                    <option value="">Now select LGA</option>
                                    {
                                        lgasForState.map((item, i: Key) => (
                                            <option value={item} key={i}>{item}</option>
                                        ))
                                    }
                                </>
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
                        <input
                            id="projectType" 
                            defaultValue="Nigeria"
                            onChange={handleChange}
                            disabled
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-main-100 sm:text-sm p-3"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
                    <select 
                        id="projectType" 
                        value={userState.goals.projectType}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-main-100 sm:text-sm p-3"
                    >
                        <option value="">Select project type</option>
                        <option>Vacation Home</option>
                        <option>Raw Land / Farm</option>
                        <option>Investment Property</option>
                        <option>Community Project</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Your Budget Contribution</label>
                    <div className="flex justify-center items-center border-b pl-3">
                        <div className="flex justify-end mt-1">
                            <p className="font-bold text-lg">₦</p>
                        </div>
                        <input 
                            type="text" 
                            id="budget" 
                            value={userState.goals.budget}
                            onChange={handleChange}
                            required
                            className="border-0 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-main-100 sm:text-sm p-3"
                        />
                    </div>
                </div>
                <button type="submit" className="flex justify-center items-center action-btn w-full bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
                    {
                        isLoading
                        ?
                        <Loader className="animate-spin"/>
                        :
                        "Browse & Filter Matches"
                    }
                </button>
            </form>
        </div>
    );
};

export default PageGoals;