'use client'

import { nigeria } from '@/constants';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';
import FormField from './FormField';
import { ClientProps, FormState } from '@/types';
import { partnershipPreferenceMatches } from '@/lib/actions/terratribe.action';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { useStateContext } from '@/context/ContextProvider';

// --- SVG Path Constants ---
// Icon for "Your Vision" - (User Profile)
const UserProfileIconPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 11 12 11s-2.5-1.12-2.5-2.5S10.62 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z";
// Icon for "Financials & Location" - (Info/Alert)
const InfoIconPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z";
// Icon for "Partner Preferences" - (Checkmark Circle)
const CheckmarkCirclePath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z";
// --- End of SVG Path Constants ---

// --- Mock Data for State/LGA Dropdowns ---
interface StateData {
    state: string;
    lgas: string[];
}

const initialFormState: FormState = {
    propertyType: 'Studio',
    timeline: 'Within 6 months',
    rooms: '1',
    furnishing: 'Furnished',
    budget: '',
    contribution: '50%',
    state: '',
    lga: '',
    partnerType: 'Individual',
    sharedValues: '',
};


// --- Main CoownershipGoalsPage Component ---
const CoownershipGoalsPage = ({ client }: { client: ClientProps }) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const { setTerratribeMatches } = useStateContext()

    // Handler for all standard input changes
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    // Special handler for State change to reset LGA
    const handleStateChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const selectedState = e.target.value;
        setFormState(prev => ({
            ...prev,
            state: selectedState,
            lga: '', // Reset LGA when state changes
        }));
    }, []);

    // Filter LGAs based on selected state
    const availableLgas = useMemo(() => {
        const stateData = nigeria.find(item => item.state === formState.state);
        if (stateData) {
            return ['', ...stateData.lga]; // Add empty option for placeholder
        }
        return [''];
    }, [formState.state]);

    // Submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payLoad = {
                "client_id": client?.id,
                "client_name": client?.name,
                "property_type": formState.propertyType,
                "timeline": formState.timeline,
                "number_of_rooms": formState.rooms,
                "furnishing_status": formState.furnishing,
                "budget": formState.budget,
                "contribution": formState.contribution,
                "lga": formState.lga,
                "state": formState.state,
                "country": "Nigeria",
                "partner_type": formState.partnerType,
                "shared_values": formState.sharedValues,
            }

            if (client.length === 0) {
                alert("You need to sign in as a client first.")
                typeof window != undefined && window.localStorage.setItem("callerpage", "/products/terra-tribe/co-ownership-goals/")
                return router.push("/sign-in")
            }

            if (!confirm("The system is about to check to see if there is a match for your preference, and will instantly create it should incase there's presently no match. So is the provided information ok by you?")) {
                return toast.warning("You can reenter the information and proceed...")
            }

            toast.warning("Querying system....")
            setIsLoading(true);
            const response = await partnershipPreferenceMatches(payLoad);
            setIsLoading(false);
            // console.log(response);
            if (response && response.alert === "success") {
                if (response.status === 200) {
                    const percentage = getMatchPercentage(response.data, payLoad)
                    // setGoalPlan(payLoad)
                    setTerratribeMatches(percentage)
                    console.log(percentage);
                    setTimeout(() => {
                        toast.success("Matches found. Proceeding...")
                        router.push("/products/terra-tribe/browse-matches")
                    }, 900)
                } else {
                    console.log(response);
                    toast.success("No matches found for your goal. The system has create it...")
                    setTimeout(() => {
                        //onNext('page-matches');
                    }, 900)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getMatchPercentage = (data: any, payLoad: any) => {
        let percentage = data.map((item: any) => (
            {
                client_id: item.client_id,
                property_type: item.property_type,
                timeline: item.timeline,
                number_of_rooms: item.number_of_rooms,
                furnishing_status: item.furnishing_status,
                budget: item.budget,
                contribution: item.contribution,
                lga: item.lga,
                state: item.state,
                country: item.country,
                partner_type: item.partner_type,
                shared_values: item.shared_values,
                percentage: (item.lga == payLoad.lga ? 1 : 0)
                    + (item.state == payLoad.state ? 1 : 0)
                    + (item.country == payLoad.country ? 1 : 0)
                    + (item.property_type == payLoad.project_type ? 1 : 0)
                    + (item.timeline == payLoad.timeline ? 1 : 0)
                    + (item.number_of_rooms == payLoad.number_of_rooms ? 1 : 0)
                    + (item.furnished_status == payLoad.furnished_status ? 1 : 0)
                    + (item.contribution == payLoad.contribution ? 1 : 0)
                    + (item.partner_type == payLoad.partner_type ? 1 : 0)
                    + (item.shared_values == payLoad.shared_values ? 1 : 0)
            }
        ));

        return percentage;
    }

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-10 flex justify-center font-['Inter']">
            <div className="container mx-auto">

                {/* Header Section */}
                <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center border-t-4 border-purple-600">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Define Your Co-Ownership Goals</h1>
                    <p className="mt-2 text-md text-gray-600">
                        Help us find the perfect match by telling us about your vision.
                    </p>
                </header>

                <main className="w-full">
                    <section className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
                        <form className="space-y-10" onSubmit={handleSubmit}>

                            {/* --- 1. Your Vision Section --- */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 mb-6 pb-2 border-b border-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={UserProfileIconPath} />
                                    </svg>
                                    <span>Your Vision</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        id="propertyType"
                                        label="Type of Property"
                                        value={formState.propertyType}
                                        onChange={handleChange}
                                        required={true}
                                        options={["Studio", "Apartment", "Flat", "Terrace", "Semi-detached", "Detached", "Other"]}
                                    />
                                    <FormField
                                        id="timeline"
                                        label="Desired Timeline"
                                        value={formState.timeline}
                                        onChange={handleChange}
                                        options={["Within 6 months", "6-12 months", "1-2 years", "Flexible"]}
                                    />
                                    <FormField
                                        id="rooms"
                                        label="Number of Rooms"
                                        value={formState.rooms}
                                        onChange={handleChange}
                                        options={["1", "2", "3", "4+"]}
                                    />
                                    <FormField
                                        id="furnishing"
                                        label="Furnishing Status"
                                        value={formState.furnishing}
                                        onChange={handleChange}
                                        options={["Furnished", "Unfurnished"]}
                                    />
                                </div>
                            </div>

                            {/* --- 2. Financials & Location Section --- */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 mb-6 pb-2 border-b border-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={InfoIconPath} />
                                    </svg>
                                    <span>Financials & Location</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        id="budget"
                                        label="Your Budget Range"
                                        value={formState.budget}
                                        onChange={handleChange}
                                        placeholder="e.g., ₦1,000,000 - ₦1,500,000"
                                    />
                                    <FormField
                                        id="contribution"
                                        label="Expected Contribution"
                                        value={formState.contribution}
                                        onChange={handleChange}
                                        options={["50%", "33%", "25%", "Other"]}
                                    />
                                    {/* State Dropdown */}
                                    <FormField
                                        id="state"
                                        label="Desired State"
                                        value={formState.state}
                                        onChange={handleStateChange} // Use special handler
                                        options={["Select a State", ...nigeria.map(item => item.state)]}
                                    />
                                    {/* LGA Dropdown - Dependent on State */}
                                    <FormField
                                        id="lga"
                                        label="Local Government Area (LGA)"
                                        value={formState.lga}
                                        onChange={handleChange}
                                        disabled={!formState.state}
                                        options={availableLgas}
                                    />
                                </div>
                            </div>

                            {/* --- 3. Partner Preferences Section --- */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 mb-6 pb-2 border-b border-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={CheckmarkCirclePath} />
                                    </svg>
                                    <span>Partner Preferences</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        id="partnerType"
                                        label="Partner Type"
                                        value={formState.partnerType}
                                        onChange={handleChange}
                                        options={["Individual", "Small group (2-3 people)", "Large group (4+ people)"]}
                                    />
                                    <FormField
                                        id="sharedValues"
                                        label="Shared Values"
                                        value={formState.sharedValues}
                                        onChange={handleChange}
                                        placeholder="e.g., sustainability, family-oriented, investment-focused"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-purple-600 text-white font-bold py-3 px-12 rounded-lg text-lg shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {
                                        isLoading
                                            ?
                                            <Loader className='animate-spin' />
                                            :
                                            "See Potential Matches"
                                    }
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CoownershipGoalsPage;
