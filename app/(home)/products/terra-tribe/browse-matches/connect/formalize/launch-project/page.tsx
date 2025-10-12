'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useCallback, useMemo } from 'react';

// --- TypeScript Interfaces ---

interface AdvisorOption {
    name: string;
    email: string;
}

interface ProcurementItem {
    item: string;
    vendor: string;
    quantity: number;
    status: 'Procured' | 'Partially Procured' | 'Not Procured';
}

interface MilestoneData {
    [key: string]: ProcurementItem[];
}

// --- Mock Data ---

const architects: AdvisorOption[] = [
    { name: "Alpha Designs Inc.", email: "alpha@example.com" },
    { name: "Urban Spaces Architects", email: "urban@example.com" },
];

const contractors: AdvisorOption[] = [
    { name: "BuildRight Construction", email: "buildright@example.com" },
    { name: "Urban Designs Ltd.", email: "urban-designs@example.com" },
];

const procurementData: MilestoneData = {
    foundation: [
        { item: "Cement (50kg bags)", vendor: "Dangote", quantity: 150, status: "Partially Procured" },
        { item: "Reinforcing Steel Bars (12mm)", vendor: "A-Steel", quantity: 200, status: "Not Procured" },
        { item: "Gravel (tonnes)", vendor: "Local Quarry", quantity: 30, status: "Procured" }
    ],
    structure: [
        { item: "Structural Timber (2x4)", vendor: "Forestwood Inc.", quantity: 50, status: "Not Procured" },
        { item: "Roofing Sheets", vendor: "RoofCo", quantity: 100, status: "Not Procured" }
    ],
    finishes: [
        { item: "Floor Tiles", vendor: "TileMart", quantity: 500, status: "Not Procured" },
        { item: "Paint (gallons)", vendor: "Dulux", quantity: 20, status: "Not Procured" }
    ]
};

// --- Helper Components (Icons) ---

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = ({ children, ...props }) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        {children}
    </svg>
);

const TimelineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M10 14H8v-2h2v2zm0-4H8V8h2v2zm-2 6h2v2H8v-2zm12-4V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H4V6h14v2h2V6z"/>
    </Icon>
);

const PaymentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h2v2H6zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
    </Icon>
);

const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/>
    </Icon>
);

const ContractorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 11 12 11s-2.5-1.12-2.5-2.5S10.62 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z"/>
    </Icon>
);

const ProcurementIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4V2h-2v7zM15 15H9c-1.1 0-2 .9-2 2v2h2v-2h2v2h2v-2h2v2h2v-2c0-1.1-.9-2-2-2z"/>
    </Icon>
);

// --- Status Message Component ---

interface StatusMessage {
    message: string;
    type: 'info' | 'success';
    key: number;
}

const StatusDisplay: React.FC<{ status: StatusMessage | null, setStatus: React.Dispatch<React.SetStateAction<StatusMessage | null>> }> = ({ status, setStatus }) => {
    if (!status) return null;

    const baseClasses = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl text-sm font-semibold transition-opacity duration-300";
    const typeClasses = status.type === 'info' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

    return (
        <div 
            key={status.key} 
            className={`${baseClasses} ${typeClasses}`}
            onClick={() => setStatus(null)} // Allow clicking to dismiss
        >
            {status.message}
        </div>
    );
}

// --- Main LaunchProjectPage Component ---

const LaunchProjectPage: React.FC = () => {
    const router = useRouter()
    const [architectSelection, setArchitectSelection] = useState('');
    const [contractorSelection, setContractorSelection] = useState('');
    const [milestone, setMilestone] = useState<keyof MilestoneData>('foundation');
    const [status, setStatus] = useState<StatusMessage | null>(null);

    // Debounced status message handler (simulates non-blocking notification)
    const showMessage = useCallback((message: string, type: 'info' | 'success' = 'info') => {
        const key = Date.now();
        setStatus({ message, type, key });
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            setStatus(prevStatus => prevStatus && prevStatus.key === key ? null : prevStatus);
        }, 4000);
    }, []);

    const handleSelectAdvisor = useCallback((type: 'architect' | 'contractor', email: string, name: string) => {
        if (!email) return;

        const subject = type === 'architect' 
            ? `Inquiry about Architectural Services for Co-owned Property`
            : `Inquiry about Construction Services for Co-owned Property`;
        
        const body = `Hello ${name},\n\nWe are a group of co-owners from Space Match and would like to inquire about your ${type} services for our property. We have selected you from our vetted list of professionals.\n\nBest regards,\n[Your Name]`;
        
        // Show non-blocking message
        showMessage(`Connection initiated with ${name}. An email prompt would open shortly.`, 'info');
        console.log(`Email initiated for ${type}: ${name} (${email})`);

        // Trigger mailto link
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    }, [showMessage]);


    // Memoized procurement table rendering for performance
    const ProcurementTable = useMemo(() => {
        const data = procurementData[milestone] || [];

        return (
            <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Item</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Vendor</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.vendor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        item.status === 'Procured' ? 'bg-green-100 text-green-800' :
                                        item.status === 'Partially Procured' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }, [milestone]);


    const selectedArchitect = architects.find(a => a.email === architectSelection);
    const selectedContractor = contractors.find(c => c.email === contractorSelection);

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-10 font-['Inter']">
            <StatusDisplay status={status} setStatus={setStatus} />
            
            <header className="bg-white shadow-xl rounded-xl p-6 mb-8 text-center border-b-4 border-purple-600 mx-auto" style={{ maxWidth: '1200px' }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Plan & Launch Co-Owned Project</h1>
                <p className="mt-2 text-md text-gray-600">
                    Welcome to your shared workspace! Collaborate with your partners to bring your vision to life.
                </p>
            </header>

            <main className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ maxWidth: '1200px' }}>
                
                {/* --- Main Shared Workspace Section (lg:col-span-2) --- */}
                <section className="lg:col-span-2 bg-white rounded-xl shadow-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <TimelineIcon className="h-6 w-6 text-purple-600" />
                        <span>Project Timeline & Management</span>
                    </h2>
                    
                    {/* Payment to SPV Section */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-inner border border-gray-200">
                        <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2">
                            <PaymentIcon className="h-6 w-6 text-purple-600" />
                            <span>Payments to Special Purpose Vehicle (SPV)</span>
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Partner</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contribution</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">You</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦50,000,000</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Partner: Jane Smith</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦500,000,000</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 shadow-lg transition-colors">
                            Make a Payment
                        </button>
                    </div>
                    
                    {/* Architect Selection Section */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-inner border border-gray-200">
                        <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2">
                            <InfoIcon className="h-6 w-6 text-purple-600" />
                            <span>Select Your Architect</span>
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">Choose a vetted architect to deliver the designs of the property. A separate fee applies for this service.</p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <select 
                                value={architectSelection} 
                                onChange={(e) => setArchitectSelection(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Select an Architect</option>
                                {architects.map(a => (
                                    <option key={a.email} value={a.email}>{a.name}</option>
                                ))}
                            </select>
                            <button 
                                onClick={() => selectedArchitect && handleSelectAdvisor('architect', selectedArchitect.email, selectedArchitect.name)}
                                disabled={!architectSelection}
                                className="w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                Select
                            </button>
                        </div>
                    </div>

                    {/* Contractor Selection Section */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-inner border border-gray-200">
                        <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2">
                            <ContractorIcon className="h-6 w-6 text-purple-600" />
                            <span>Select Your Contractor</span>
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">Choose a vetted contractor for your project. A separate fee applies for this service.</p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <select 
                                value={contractorSelection}
                                onChange={(e) => setContractorSelection(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Select a Contractor</option>
                                {contractors.map(c => (
                                    <option key={c.email} value={c.email}>{c.name}</option>
                                ))}
                            </select>
                            <button 
                                onClick={() => selectedContractor && handleSelectAdvisor('contractor', selectedContractor.email, selectedContractor.name)}
                                disabled={!contractorSelection}
                                className="w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                Select
                            </button>
                        </div>
                    </div>

                    {/* Procurement Dashboard Section */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-inner border border-gray-200">
                        <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2">
                            <ProcurementIcon className="h-6 w-6 text-purple-600" />
                            <span>Procurement Dashboard</span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <p className="font-semibold text-gray-700 flex-shrink-0">Milestone:</p>
                                <select 
                                    value={milestone}
                                    onChange={(e) => setMilestone(e.target.value as keyof MilestoneData)}
                                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 w-full"
                                >
                                    <option value="foundation">1. Foundation (In Progress)</option>
                                    <option value="structure">2. Structure (Upcoming)</option>
                                    <option value="finishes">3. Finishes (Upcoming)</option>
                                </select>
                            </div>
                            <div id="procurement-table-container">
                                {ProcurementTable}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Sidebar Section (lg:col-span-1) --- */}
                <aside className="lg:col-span-1 space-y-8">
                    {/* Shared Budget */}
                    <div className="bg-white rounded-xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <InfoIcon className="h-6 w-6 text-purple-600" />
                            <span>Shared Budget</span>
                        </h2>
                        <div className="text-center bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
                            <p className="text-5xl font-extrabold text-purple-600">₦35,000,000</p>
                            <p className="text-sm text-gray-600 mt-1">Remaining Budget</p>
                        </div>
                        <button className="mt-4 w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 shadow-md transition-colors">
                            View Budget Breakdown
                        </button>
                    </div>

                    {/* Integrated Services */}
                    <div className="bg-white rounded-xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <InfoIcon className="h-6 w-6 text-purple-600" />
                            <span>Integrated Services</span>
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                                <img src="https://placehold.co/40x40/5D2C8D/ffffff?text=FH" onError={(e) => (e.currentTarget.src='https://placehold.co/40x40/E2E8F0/64748B?text=Home')} alt="FlexiHabitat Icon" className="rounded-full h-10 w-10 object-cover"/>
                                <div>
                                    <p className="font-bold text-gray-800">FlexiHabitat Homes</p>
                                    <p className="text-sm text-gray-600">Connect to customize your prefab home.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                                <img src="https://placehold.co/40x40/8D5D2C/ffffff?text=RM" onError={(e) => (e.currentTarget.src='https://placehold.co/40x40/E2E8F0/64748B?text=Brick')} alt="RootsManor Icon" className="rounded-full h-10 w-10 object-cover"/>
                                <div>
                                    <p className="font-bold text-gray-800">RootsManor Contractors</p>
                                    <p className="text-sm text-gray-600">Manage contractors for your brick-and-mortar build.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <footer className="mx-auto p-6 text-center" style={{ maxWidth: '1200px' }}>
                <button 
                    onClick={() => router.push("/products/terra-tribe/browse-matches/connect/formalize/launch-project/payment")}
                    className="w-full lg:w-auto bg-purple-600 text-white font-bold py-4 px-12 rounded-xl shadow-2xl hover:bg-purple-700 transition-colors duration-300 transform hover:scale-[1.01]">
                    Start Building Together
                </button>
            </footer>
        </div>
    );
};

export default LaunchProjectPage;
