'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useCallback, useMemo } from 'react';

// --- Helper Components (Icons) ---

const DocumentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 15h2v-2h-2v2zm0-4h2V7h-2v6zm0-4h2V7h-2v2z"/>
    </svg>
);

const AdvisorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h-2v6z"/>
    </svg>
);

// --- Advisor Data ---
const legalAdvisors = [
    { name: "Akin & Partners LLP", email: "legal.akin@example.com" },
    { name: "Justice Associates", email: "legal.justice@example.com" },
];

const financialAdvisors = [
    { name: "WealthBridge Financial", email: "finance.wealth@example.com" },
    { name: "Global Capital Ventures", email: "finance.global@example.com" },
];

// --- Main FormalizeCoownership Component ---
const FormalizeCoownership: React.FC = () => {
    const router = useRouter()
    const [isAgreed, setIsAgreed] = useState(false);
    const [signature, setSignature] = useState('');
    const [signatureStatus, setSignatureStatus] = useState('');
    const [isAgreementVisible, setIsAgreementVisible] = useState(false);
    const [legalAdvisor, setLegalAdvisor] = useState('');
    const [financialAdvisor, setFinancialAdvisor] = useState('');
    const [connectStatus, setConnectStatus] = useState<string | null>(null);

    const isSigned = signatureStatus === 'Agreement signed successfully!';

    // Derived states for button enablement
    const canSign = isAgreed && signature.trim() !== '' && !isSigned;
    const canProceed = isSigned;
    const canConnectLegal = legalAdvisor !== '';
    const canConnectFinancial = financialAdvisor !== '';

    const handleSign = useCallback(() => {
        if (!canSign) {
            setSignatureStatus('Please agree to the terms and provide your signature.');
            return;
        }

        setSignatureStatus('Agreement signed successfully!');
        // Note: In a real app, this would trigger a backend API call to finalize the document.
    }, [canSign]);

    const handleEmailAgreement = useCallback(() => {
        setSignatureStatus('Preparing agreement for download/email...');
        setConnectStatus(null);
        // Simulate email/download process
        setTimeout(() => {
            setSignatureStatus('Agreement ready! (Mail action simulated)');
            console.log(`Document signed by: ${signature}. Attempting to email/download.`);
            setTimeout(() => {
                 setSignatureStatus('Agreement signed successfully!'); // Reset to successful state
            }, 3000);
        }, 1500);
    }, [signature]);

    const handleAdvisorConnect = useCallback((advisorType: 'legal' | 'financial', email: string) => {
        if (!email) return;

        const advisorName = advisorType === 'legal' 
            ? legalAdvisors.find(a => a.email === email)?.name 
            : financialAdvisors.find(a => a.email === email)?.name;

        setConnectStatus(`Attempting to connect with ${advisorName} (${advisorType} advisor)...`);
        
        // Simulate mailto action with non-blocking message
        setTimeout(() => {
            setConnectStatus(`Connection initiated! A mail prompt for ${advisorName} would open here.`);
            console.log(`Mailto link triggered for ${advisorType} advisor: ${email}`);
        }, 1500);

        setTimeout(() => setConnectStatus(null), 5000); // Clear message
    }, []);

    const handleProceed = useCallback(() => {
        if (canProceed) {
            setConnectStatus('Proceeding to Project Planning...');
            console.log('Proceeding to Project Planning...');
            // In a real app, this would navigate to the next page/route
            setTimeout(() => setConnectStatus(null), 3000);
            router.push("/products/terra-tribe/browse-matches/connect/formalize/launch-project")
        }
    }, [canProceed]);

    const getStatusClasses = useMemo(() => {
        if (isSigned) return 'text-green-600 bg-green-50 p-2 rounded';
        if (signatureStatus) return 'text-red-500 bg-red-50 p-2 rounded';
        return 'hidden';
    }, [isSigned, signatureStatus]);

    return (
        <div className="container bg-gray-100 min-h-screen px-6 pt-28 pb-10 font-['Inter']">
            <header className="bg-white shadow-xl rounded-xl p-6 mb-8 text-center border-b-4 border-purple-600 mx-auto" style={{ maxWidth: '900px' }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Formalize Your Co-Ownership</h1>
                <p className="mt-2 text-md text-gray-600">
                    It's time to make it official. Follow these steps to formalize your partnership and secure your shared future.
                </p>
            </header>

            <main className="mx-auto">
                {/* --- Co-Ownership Agreement Section --- */}
                <section className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <DocumentIcon className="h-6 w-6 text-purple-600" />
                        <span>Co-Ownership Agreement</span>
                    </h2>
                    
                    {/* Link to view agreement */}
                    <p className="text-gray-600 mb-4 text-sm">
                        Please read the full co-ownership agreement before proceeding. 
                        <button 
                            onClick={() => setIsAgreementVisible(prev => !prev)}
                            className="text-purple-600 font-bold hover:underline focus:outline-none ml-1"
                        >
                            {isAgreementVisible ? 'Hide Agreement' : 'Read Agreement'}
                        </button>
                    </p>
                    
                    {/* Agreement text */}
                    <div className={isAgreementVisible ? '' : 'hidden'}>
                        <div className="agreement-scrollbox bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed mb-6 border border-gray-200 shadow-inner">
                            {/* Comprehensive Agreement Text */}
                            <p className="font-extrabold mb-2">CO-OWNERSHIP AGREEMENT</p>
                            <p>This Agreement is made and entered into this [Date] by and between the parties hereto, collectively referred to as "Co-Owners".</p>
                            <p className="mt-3"><strong>1. Purpose of Agreement:</strong> The purpose of this agreement is to establish the terms and conditions of co-ownership of the property located at [Property Address] ("the Property").</p>
                            <p className="mt-3"><strong>2. Ownership Shares:</strong> The Co-Owners agree to hold the Property as tenants in common, with each party owning an undivided [Share Percentage]% interest in the Property. These shares are as agreed upon during the platform’s matching process.</p>
                            <p className="mt-3"><strong>3. Financial Contributions:</strong> Each Co-Owner shall be responsible for their proportional share of all financial obligations related to the Property, including but not limited to purchase price, taxes, insurance, mortgage payments, maintenance, and capital improvements.</p>
                            <p className="mt-3"><strong>4. Use of the Property:</strong> The Co-Owners shall establish a usage schedule for the Property. This schedule shall be documented and agreed upon by all parties. In case of disagreement, a mediator may be engaged to facilitate a resolution.</p>
                            <p className="mt-3"><strong>5. Maintenance and Repairs:</strong> The Co-Owners shall collectively agree on major maintenance and repair work. For minor repairs, a designated Co-Owner may be responsible for initiating the work up to a pre-agreed financial limit without prior approval from the other Co-Owners.</p>
                            <p className="mt-3"><strong>6. Sale or Transfer of Interest:</strong> No Co-Owner shall sell, lease, or otherwise transfer their interest in the Property without the prior written consent of the other Co-Owners. A right of first refusal shall be granted to the remaining Co-Owners to purchase the departing party’s interest at fair market value.</p>
                            <p className="mt-3"><strong>7. Dispute Resolution:</strong> Any dispute arising from this Agreement shall first be subject to good faith negotiation between the Co-Owners. If unresolved, a formal mediation process shall be initiated. Should mediation fail, disputes shall be resolved through binding arbitration in Lagos, Nigeria, in accordance with the laws of the Federal Republic of Nigeria.</p>
                            <p className="mt-3"><strong>8. Governing Law:</strong> This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
                            <p className="mt-4 font-semibold">By signing below, the Co-Owners acknowledge that they have read, understood, and agree to be bound by the terms and conditions of this Agreement.</p>
                        </div>
                    </div>
                    
                    <div id="signature-section" className="border-t border-gray-200 pt-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <input 
                                type="checkbox" 
                                id="agreement-agree" 
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                                disabled={isSigned}
                                className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                            />
                            <label htmlFor="agreement-agree" className="text-sm font-medium text-gray-800 cursor-pointer">
                                I have read, understood, and agree to the Co-Ownership Agreement.
                            </label>
                        </div>
                        <div>
                            <label htmlFor="digital-signature" className="block text-sm font-medium text-gray-700">Digital Signature</label>
                            <input 
                                type="text" 
                                id="digital-signature" 
                                placeholder="Type your full name" 
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                disabled={isSigned}
                                required 
                                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-shadow shadow-sm"
                            />
                        </div>
                        <div className="mt-4 space-y-3">
                            <button 
                                id="sign-button" 
                                onClick={handleSign}
                                disabled={!canSign}
                                className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-md shadow-lg transition-colors duration-300 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Digitally Sign Agreement
                            </button>
                            <p id="signature-status" className={`text-center text-sm font-medium transition-all duration-300 ${getStatusClasses}`}>
                                {signatureStatus}
                            </p>
                            {isSigned && (
                                <button 
                                    id="email-agreement-button" 
                                    onClick={handleEmailAgreement}
                                    className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-md shadow-md transition-colors duration-300 hover:bg-gray-300"
                                >
                                    Download & Email Agreement
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* --- Advisors Section --- */}
                <section className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                        <AdvisorIcon className="h-6 w-6 text-purple-600" />
                        <span>Access to Vetted Advisors</span>
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Connect with our network of legal and financial advisors for an additional fee. This is an optional service to ensure your co-ownership is structured professionally.
                    </p>

                    {connectStatus && (
                        <p className="p-3 mb-4 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-lg shadow-inner">
                            {connectStatus}
                        </p>
                    )}

                    <div className="space-y-4">
                        {/* Legal Advisor */}
                        <div className="flex flex-col sm:flex-row items-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <div className="flex-1 w-full">
                                <label htmlFor="legal-advisor" className="block text-sm font-medium text-gray-700">Legal Advisor</label>
                                <select 
                                    id="legal-advisor" 
                                    value={legalAdvisor}
                                    onChange={(e) => setLegalAdvisor(e.target.value)}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="">Select a Legal Advisor</option>
                                    {legalAdvisors.map(advisor => (
                                        <option key={advisor.email} value={advisor.email}>{advisor.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                id="connect-legal-button" 
                                onClick={() => handleAdvisorConnect('legal', legalAdvisor)}
                                disabled={!canConnectLegal}
                                className="w-full sm:w-auto bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                Connect
                            </button>
                        </div>
                        
                        {/* Financial Advisor */}
                        <div className="flex flex-col sm:flex-row items-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <div className="flex-1 w-full">
                                <label htmlFor="financial-advisor" className="block text-sm font-medium text-gray-700">Financial Advisor</label>
                                <select 
                                    id="financial-advisor" 
                                    value={financialAdvisor}
                                    onChange={(e) => setFinancialAdvisor(e.target.value)}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="">Select a Financial Advisor</option>
                                    {financialAdvisors.map(advisor => (
                                        <option key={advisor.email} value={advisor.email}>{advisor.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                id="connect-financial-button" 
                                onClick={() => handleAdvisorConnect('financial', financialAdvisor)}
                                disabled={!canConnectFinancial}
                                className="w-full sm:w-auto bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- CTA Section --- */}
                <div className="text-center mt-8 pb-10">
                    <button 
                        id="proceed-button" 
                        onClick={handleProceed}
                        disabled={!canProceed}
                        className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                    >
                        Proceed to Project Planning
                    </button>
                </div>
            </main>
        </div>
    );
};

export default FormalizeCoownership;
