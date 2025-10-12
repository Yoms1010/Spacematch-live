'use client'

import { nigeria } from '@/constants';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';

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

// const statesAndLgas: StateData[] = [
//     { state: "Lagos", lgas: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa"] },
//     { state: "Ogun", lgas: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Ewekoro", "Ifo"] },
//     { state: "Abuja (FCT)", lgas: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali"] },
//     { state: "Rivers", lgas: ["Port Harcourt", "Obio/Akpor", "Eleme"] },
// ];

// --- Form State Initialization ---
interface FormState {
    propertyType: string;
    timeline: string;
    rooms: string;
    furnishing: string;
    budget: string;
    contribution: string;
    state: string;
    lga: string;
    partnerType: string;
    sharedValues: string;
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

// --- Reusable Form Input Component ---
interface FormFieldProps {
    id: keyof FormState;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: string;
    placeholder?: string;
    options?: string[];
    disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    options,
    disabled = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {options ? (
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition-colors ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-white'}`}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
            )}
        </div>
    );
};

// --- Main CoownershipGoalsPage Component ---
const CoownershipGoalsPage: React.FC = () => {

    const router = useRouter()
    const [formState, setFormState] = useState<FormState>(initialFormState);

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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting Co-Ownership Goals:', formState);
        // In a real app, this is where you'd send data to an API
        // For demonstration, we'll log a success message instead of using alert()
        alert('Form Submitted! Check console for details.'); 

        router.push("/products/terra-tribe/browse-matches")
    };

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
                                    className="bg-purple-600 text-white font-bold py-3 px-12 rounded-lg text-lg shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    See Potential Matches
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
