'use client'


import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// --- Type Definitions ---
type MilestoneStatus = 'completed' | 'current' | 'pending';

interface Milestone {
    id: number;
    title: string;
    description: string;
    status: MilestoneStatus;
}

interface MilestoneStepProps {
    milestone: Milestone;
}

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}


// --- Static Data & Configuration ---
const initialMilestones: Milestone[] = [
    {
        id: 1,
        title: '1. Deposit',
        description: 'Initial deposit received to secure your spot. Funds are held in escrow.',
        status: 'completed',
    },
    {
        id: 2,
        title: '2. Verification & Transfer',
        description: 'Due diligence is complete. Funds will be released upon ownership confirmation.',
        status: 'current',
    },
    {
        id: 3,
        title: '3. Ownership Confirmed',
        description: "The land title is transferred and registered in your group's name.",
        status: 'pending',
    },
];

const mockContractText = `
    <strong>LAND LEASE AGREEMENT</strong>
    <p>This Land Lease Agreement is made on this day by and between the Landlord [Admin/SPV Name] and the Tenants [Co-Owners' Names].</p>
    <p><strong>1. Property Description:</strong> The Landlord agrees to lease to the Tenants the land located at [Property Address], hereinafter referred to as the "Leased Premises".</p>
    <p><strong>2. Term of Lease:</strong> The term of this lease shall be for [e.g., 99 years], commencing on [Start Date] and ending on [End Date].</p>
    <p><strong>3. Use of Premises:</strong> The Leased Premises shall be used solely for the purpose of constructing and operating residential or commercial properties as agreed upon by the Co-Owners and in compliance with all zoning laws.</p>
    <p>By signing below, the Tenants acknowledge that they have read, understood, and agree to be bound by the terms and conditions of this Land Lease Agreement.</p>
`;


// --- SVG Icon Components ---
const InfoIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>);
const CheckIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z"/></svg>);
const UserIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 11 12 11s-2.5-1.12-2.5-2.5S10.62 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z"/></svg>);
const DocumentIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 15h2v-2h-2v2zm0-4h2V7h-2v2z"/></svg>);
const PendingIcon: React.FC = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>);


// --- Reusable Sub-Components ---

const MilestoneStep: React.FC<MilestoneStepProps> = ({ milestone }) => {
    const statusStyles = {
        completed: 'bg-green-100 text-green-800',
        current: 'bg-purple-100 text-purple-800',
        pending: 'bg-gray-100 text-gray-500',
    };
    const iconBgStyles = {
        completed: 'bg-green-600',
        current: 'bg-purple-600',
        pending: 'bg-gray-400',
    };
    const icon = {
        completed: <CheckIcon />,
        current: <UserIcon />,
        pending: <PendingIcon />,
    };

    return (
        <div className={`p-4 rounded-lg flex items-start space-x-4 ${statusStyles[milestone.status]}`}>
            <div className={`flex-shrink-0 p-2 rounded-full text-white ${iconBgStyles[milestone.status]}`}>
                {icon[milestone.status]}
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800">{milestone.title}</h3>
                <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>
        </div>
    );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Purchase Initiated!</h3>
                <p className="text-gray-600 mb-4">
                    Your payment has been secured in escrow. You will be notified once the land transfer is complete.
                </p>
                <button
                    onClick={onClose}
                    className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition-colors"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};


// --- Main Page Component ---
const SecureLandPage: React.FC = () => {
    const router = useRouter()
    const [isContractAvailable, setIsContractAvailable] = useState(false);
    const [isContractVisible, setIsContractVisible] = useState(false);
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const [digitalSignature, setDigitalSignature] = useState('');
    const [isContractSigned, setIsContractSigned] = useState(false);
    const [signatureStatus, setSignatureStatus] = useState<{message: string, type: 'success' | 'error' } | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Simulate contract being uploaded by an admin after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsContractAvailable(true);
        }, 2000);
        return () => clearTimeout(timer); // Cleanup on component unmount
    }, []);

    const handleSignContract = () => {
        setIsContractSigned(true);
        setSignatureStatus({ message: 'Contract signed successfully! You may now complete your purchase.', type: 'success'});
    };
    
    const handleCompletePurchase = () => {
        if (isContractSigned) {
            setIsModalVisible(true);
            router.push("/property/acquisition/due-diligence/secure-land/confirmation")
        } else {
            alert('Please sign the contract before completing your purchase.');
        }
    };
    
    const handleCloseModal = () => {
        setIsModalVisible(false);
        alert("Redirecting to dashboard to track your project.");
    };

    const handleViewEscrow = () => {
        alert("This feature provides a transparent view of all transactions within the escrow account. All stakeholders have access to this real-time financial log to ensure trust and accountability.");
    };
    
    const canSignContract = isAgreementChecked && digitalSignature.trim() !== '';

    return (
        <>
            <ConfirmationModal isOpen={isModalVisible} onClose={handleCloseModal} />
            <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-5 font-sans">
                <header className="bg-white shadow-sm rounded-xl p-6 mb-8 text-center max-w-5xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-800">Secure the Land</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Initiate the final transaction and secure your co-owned property with our transparent escrow service.
                    </p>
                </header>

                <main className="max-w-5xl mx-auto">
                    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        {/* Milestones */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2"><InfoIcon /><span>Escrow & Payment Milestones</span></h2>
                        <p className="text-gray-600 mb-6 text-sm">Your funds will be held in a secure escrow account and released as each milestone is verified.</p>
                        <div className="space-y-4">
                            {initialMilestones.map((milestone) => (
                                <MilestoneStep key={milestone.id} milestone={milestone} />
                            ))}
                        </div>

                        {/* Escrow View */}
                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2"><InfoIcon /><span>Escrow Account & Transactions</span></h3>
                            <p className="text-gray-600 mb-4 text-sm">For full transparency, all stakeholders can view the escrow account and transaction history.</p>
                            <button onClick={handleViewEscrow} className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition-colors">View Transactions</button>
                        </div>
                        
                        {/* Contract Signing */}
                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2"><DocumentIcon /><span>Land Lease Contract</span></h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                The contract will be visible here after it has been uploaded by the admin.
                                {isContractAvailable && (
                                    <button onClick={() => setIsContractVisible(!isContractVisible)} className="text-purple-600 font-bold hover:underline ml-2">
                                        {isContractVisible ? 'Hide Contract' : 'View & Sign Contract'}
                                    </button>
                                )}
                            </p>

                            {isContractVisible && (
                                <div>
                                    <div className="max-h-[400px] overflow-y-auto bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed mb-6"
                                         dangerouslySetInnerHTML={{ __html: mockContractText }} />
                                    
                                    <div className="pt-2">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <input type="checkbox" id="contract-agree" checked={isAgreementChecked} onChange={(e) => setIsAgreementChecked(e.target.checked)} disabled={isContractSigned} className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500" />
                                            <label htmlFor="contract-agree" className="text-sm font-medium text-gray-800">I have read, understood, and agree to the Land Lease Agreement.</label>
                                        </div>
                                        <div>
                                            <label htmlFor="digital-signature" className="block text-sm font-medium text-gray-700">Digital Signature</label>
                                            <input type="text" id="digital-signature" placeholder="Type your full name" value={digitalSignature} onChange={(e) => setDigitalSignature(e.target.value)} required disabled={isContractSigned} className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                                        </div>
                                        <div className="mt-4">
                                            <button onClick={handleSignContract} disabled={!canSignContract || isContractSigned} className={`w-full font-bold py-3 px-8 rounded-md shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${canSignContract && !isContractSigned ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-400 text-white'}`}>
                                                {isContractSigned ? 'Contract Signed' : 'Digitally Sign Contract'}
                                            </button>
                                            {signatureStatus && (
                                                <p className={`text-center text-sm mt-2 ${signatureStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {signatureStatus.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <div className="text-center mt-8">
                        <button onClick={handleCompletePurchase} disabled={!isContractSigned} className={`font-bold py-4 px-8 rounded-md shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isContractSigned ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-400 text-white'}`}>
                            Complete Purchase
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default SecureLandPage;