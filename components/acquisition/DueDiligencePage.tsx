'use client'

import { ClientProps } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// --- Type Definitions ---
// Defines the shape of a checklist item for type safety.
interface ChecklistItemData {
    id: number;
    title: string;
    serviceName: string;
}

// Defines the shape of a legal expert for the dropdown.
interface LegalExpert {
    id: string;
    name: string;
    email: string;
}

// Defines the props for the ChecklistItem component.
interface ChecklistItemProps {
    title: string;
    onStart: () => void;
    isPropertyVerified: boolean
}


// --- Static Data ---
const verificationItems: ChecklistItemData[] = [
    { id: 1, title: 'Land Title Checks', serviceName: 'Land Title Check' },
    { id: 2, title: 'Zoning Compliance', serviceName: 'Zoning Compliance' },
    { id: 3, title: 'Structural Integrity Report', serviceName: 'Structural Report' },
];

const legalExperts: LegalExpert[] = [
    { id: 'akin', name: 'Akin & Partners LLP', email: 'legal.akin@example.com' },
    { id: 'justice', name: 'Justice Associates', email: 'legal.justice@example.com' },
];


// --- SVG Icon Component ---
const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" />
    </svg>
);


// --- ChecklistItem Component ---
// A reusable component for each item in the verification list.
const ChecklistItem: React.FC<ChecklistItemProps> = ({ title, onStart, isPropertyVerified }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="text-lg font-medium text-gray-800">{title}</span>
        <button
            onClick={onStart}
            disabled={!isPropertyVerified}
            className="bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors"
        >
            Start Verification
        </button>
    </div>
);


// --- Main Page Component ---
const DueDiligencePage = ({client}: {client: ClientProps}) => {
    const router = useRouter()
    // State to track if any verification has been started to enable the final button.
    const [isVerificationStarted, setIsVerificationStarted] = useState<boolean>(client.is_property_verified == "no" ? false : true);
    // State to hold the email of the selected legal expert.
    const [selectedExpertEmail, setSelectedExpertEmail] = useState<string>('');

    // --- Event Handlers ---

    const handleStartVerification = (serviceName: string): void => {
        alert(`Initiating ${serviceName}. The results will be updated in your dashboard shortly.`);
        // Set state to true once any verification starts.
        setIsVerificationStarted(true);
    };

    const handleExpertSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedExpertEmail(e.target.value);
    };

    const handleConsultClick = (): void => {
        if (selectedExpertEmail) {
            alert(`An email has been sent to the legal expert. You can expect a response shortly.`);
            const subject = encodeURIComponent(`Legal Consultation on Land Due Diligence`);
            const body = encodeURIComponent(`Hello, I would like to schedule a consultation to discuss the due diligence findings for a co-owned property. My name is [Your Name].`);
            window.location.href = `mailto:${selectedExpertEmail}?subject=${subject}&body=${body}`;
        }
    };
    
    const handleProceedClick = (): void => {
        router.push("/property/acquisition/due-diligence/secure-land")
        alert('Proceeding to secure land...');
        // In a real application, this would likely navigate to another route.
    };

    // Derived state: determines if the consult button should be enabled.
    const isConsultButtonEnabled = !!selectedExpertEmail;

    if (client.is_property_verified === "no") {
        toast.warn("Your previously saved property is still being verified by our team..")
    }

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-5 font-sans">
            <header className="bg-white shadow-sm rounded-xl p-6 mb-8 text-center max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800">Due Diligence & Verification</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Ensure your selected property is ready for co-ownership with our transparent verification process.
                </p>
            </header>

            <main className="max-w-5xl mx-auto">
                {/* Verification Checklist Section */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <InfoIcon />
                        <span>Verification Checklist</span>
                    </h2>
                    <div className="space-y-4">
                        {verificationItems.map((item) => (
                            <ChecklistItem
                                key={item.id}
                                title={item.title}
                                isPropertyVerified={client.is_property_verified == "no" ? false : true}
                                onStart={() => handleStartVerification(item.serviceName)}
                            />
                        ))}
                    </div>
                </section>
                
                {/* Legal Experts Section */}
                <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <InfoIcon />
                        <span>Consult with Legal Experts</span>
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Get peace of mind by consulting with our recommended legal professionals on your due diligence findings.
                    </p>
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <label htmlFor="legal-expert" className="block text-sm font-medium text-gray-700">Legal Expert</label>
                            <select
                                id="legal-expert"
                                value={selectedExpertEmail}
                                onChange={handleExpertSelectChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Select a Legal Expert</option>
                                {legalExperts.map((expert) => (
                                    <option key={expert.id} value={expert.email}>
                                        {expert.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleConsultClick}
                            disabled={!isConsultButtonEnabled}
                            className={`font-bold py-2 px-6 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                isConsultButtonEnabled
                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            Consult
                        </button>
                    </div>
                </section>

                {/* Final CTA Button */}
                <div className="text-center">
                    <button
                        onClick={handleProceedClick}
                        disabled={client.is_property_verified == "yes" ? false : true}
                        className={`font-bold py-4 px-8 rounded-md shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isVerificationStarted
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-400 text-white'
                        }`}
                    >
                        Proceed to Secure Land
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DueDiligencePage;