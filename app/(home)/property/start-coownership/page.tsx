'use client'

import React, { Key, useState } from 'react';

// --- Data Definitions ---

// Simple state object to store data and prevent repetition
const initialUserState = {
    goals: {
        location: 'Lekki, Lagos',
        projectType: 'Raw Land / Farm',
        budget: '₦75,000,000',
    },
    partner: '',
};

// Define the full, combined flow
const flowSteps = [
  { id: 'page-start', label: 'Start' },
  { id: 'page-goals', label: 'Goals' },
  { id: 'page-matches', label: 'Matches' },
  { id: 'page-chat', label: 'Chat' },
  { id: 'page-formalize', label: 'Formalize' },
  { id: 'page-plan', label: 'Plan' },
  { id: 'page-deposit', label: 'Deposit' },
  // Seamless transition happens here
  { id: 'page-acquire-land-start', label: 'Acquire' },
  { id: 'page-acquire-land-listings', label: 'Listings' },
  { id: 'page-acquire-land-due-diligence', label: 'Diligence' },
  { id: 'page-acquire-land-finalize', label: 'Finalize' },
  { id: 'page-done', label: 'Complete' }
];

// --- Reusable Stepper Component ---

const Stepper = ({ steps, currentStepId }: { steps: any, currentStepId:any }) => {
    const currentStepIndex = steps.findIndex((step: any) => step.id === currentStepId);

    return (
        <div className="flex items-start mb-8 sm:mb-12">
            {steps.map((step: any, index: number | any) => {
                let statusClass = '';
                if (index < currentStepIndex) {
                    statusClass = 'completed';
                } else if (index === currentStepIndex) {
                    statusClass = 'active';
                }

                let dotContent = index + 1;
                if (statusClass === 'completed') {
                    dotContent = '✓'; // Checkmark
                }
                
                // Helper classes for Tailwind JIT
                // active: bg-main-100 text-white text-main-100
                // completed: bg-main-100 text-white text-main-100
                
                const dotClasses = `w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all duration-300 ${
                    statusClass === 'active' || statusClass === 'completed'
                        ? 'bg-main-100 text-white'
                        : 'bg-gray-300 text-gray-600'
                }`;
                
                const lineClasses = `h-1 w-full -mt-5 transition-all duration-300 ${
                    statusClass === 'completed' ? 'bg-main-100' : 'bg-gray-300'
                }`;

                const labelClasses = `text-xs sm:text-sm text-center mt-2 font-medium transition-all duration-300 ${
                    statusClass === 'active' || statusClass === 'completed'
                        ? 'text-main-100'
                        : 'text-gray-500'
                }`;

                return (
                    <div key={step.id} className="flex flex-col items-center w-full">
                        <div className="flex items-center w-full">
                            {/* Connector line (not for first item) */}
                            {index > 0 ? <div className={`${lineClasses} flex-1`}></div> : <div className="flex-1"></div>}
                            
                            {/* Dot */}
                            <div className={dotClasses}>{dotContent}</div>
                            
                            {/* Connector line (not for last item) */}
                            {index < steps.length - 1 ? <div className={`${lineClasses} flex-1`}></div> : <div className="flex-1"></div>}
                        </div>
                        <p className={labelClasses}>{step.label}</p>
                    </div>
                );
            })}
        </div>
    );
};


// --- Page Components ---

// PAGE 1: Start Ownership Plan (Landing)
const PageStart = ({ onNext }: {onNext: any}) => (
    <div className="text-center">
        {/*  */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Ownership Plan</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">Find trusted partners and acquire your dream property together. Let's begin by defining what you're looking for.</p>
        <button 
            onClick={() => onNext('page-goals')} 
            className="action-btn bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
        >
            Define Your Co-Ownership Goals
        </button>
    </div>
);

// PAGE 2: Define Your Co-Ownership Goals
const PageGoals = ({ onNext, userState, setUserState }: { onNext: any, userState: any, setUserState: any }) => {
    
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onNext('page-matches');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Define Your Goals</h2>
            <p className="text-gray-600 mb-6">Tell us what you're looking for. This helps us find the perfect partners for your project.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Preferred Location (e.g., "Abuja", "Lekki, Lagos")</label>
                    <input 
                        type="text" 
                        id="location" 
                        value={userState.goals.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-main-100 sm:text-sm p-3" 
                    />
                </div>
                <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
                    <select 
                        id="projectType" 
                        value={userState.goals.projectType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-main-100 sm:text-sm p-3"
                    >
                        <option>Vacation Home</option>
                        <option>Raw Land / Farm</option>
                        <option>Investment Property</option>
                        <option>Community Project</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Your Budget Contribution</label>
                    <input 
                        type="text" 
                        id="budget" 
                        value={userState.goals.budget}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-main-100 sm:text-sm p-3"
                    />
                </div>
                <button type="submit" className="action-btn w-full bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
                    Browse & Filter Matches
                </button>
            </form>
        </div>
    );
};

// PAGE 3: Browse & Filter Matches
const PageMatches = ({ onNext, setUserState }: { onNext: any, setUserState: any }) => {
    
    const handleConnect = (partnerName: any) => {
        setUserState((prevState: any) => ({ ...prevState, partner: partnerName }));
        onNext('page-chat');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Partners</h2>
            <p className="text-gray-600 mb-6">We found 3 potential partners based on your goals. (This is a simulation. Click "Connect" to proceed).</p>
            <div className="space-y-4">
                {/* Mock Partner 1 */}
                <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-4">
                        <img src="https://placehold.co/60x60/E0E7FF/4F46E5?text=A" alt="Partner" className="w-16 h-16 rounded-full" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Amaka & Tunde A.</h3>
                            <p className="text-gray-600">Also looking for <span className="font-medium text-gray-800">Raw Land</span> in <span className="font-medium text-gray-800">Lekki, Lagos</span>.</p>
                            <p className="text-green-600 font-medium">92% Match</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleConnect('Amaka & Tunde A.')}
                        className="action-btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg shadow transition duration-300"
                    >
                        Connect
                    </button>
                </div>
                {/* Mock Partner 2 */}
                <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between shadow-sm opacity-70">
                    <div className="flex items-center space-x-4">
                        <img src="https://placehold.co/60x60/D1FAE5/065F46?text=C" alt="Partner" className="w-16 h-16 rounded-full" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Chinedu M.</h3>
                            <p className="text-gray-600">Looking for <span className="font-medium text-gray-800">Investment Property</span>.</p>
                            <p className="text-yellow-600 font-medium">74% Match</p>
                        </div>
                    </div>
                    <button className="bg-gray-300 text-gray-600 font-bold py-2 px-5 rounded-lg cursor-not-allowed">Connect</button>
                </div>
            </div>
        </div>
    );
};

// PAGE 4: Initiate Connection & Chat
const PageChat = ({ onNext, userState }: { onNext: any, userState: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat with <span id="chat-partner-name">{userState.partner}</span></h2>
        <div className="border rounded-lg bg-gray-50 h-64 p-4 space-y-3 overflow-y-auto shadow-inner mb-4">
            {/* Mock Chat */}
            <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                    Hi! We saw your profile and are also looking for land in Lekki.
                </div>
            </div>
            <div className="flex justify-end">
                <div className="bg-main-100 text-white p-3 rounded-lg max-w-xs">
                    That's great! Your profile looks like a perfect match. What are your specific goals?
                </div>
            </div>
            <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                    We're hoping to find a few plots to set up a small sustainable farm.
                </div>
            </div>
        </div>
        <div className="flex space-x-2">
            <input type="text" placeholder="Type your message... (simulation)" className="flex-grow rounded-lg border-gray-300 shadow-sm p-3" disabled />
            <button 
                onClick={() => onNext('page-formalize')}
                className="action-btn bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Formalize Co-Ownership
            </button>
        </div>
    </div>
);

// PAGE 5: Formalize Your Co-Ownership
const PageFormalize = ({ onNext, userState }: { onNext: any, userState: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Formalize Your Co-Ownership</h2>
        <p className="text-gray-600 mb-6">Review the terms of your partnership agreement. This legal framework ensures everyone is aligned and protected.</p>
        <div className="border rounded-lg p-6 bg-gray-50 shadow-inner max-h-72 overflow-y-auto">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Co-Ownership Agreement Summary</h3>
            <p className="font-medium text-gray-700">Partners:</p>
            <ul className="list-disc list-inside mb-4 ml-4 text-gray-600">
                <li>You (User)</li>
                <li><span>{userState.partner}</span></li>
            </ul>
            <p className="font-medium text-gray-700">Project:</p>
            <ul className="list-disc list-inside mb-4 ml-4 text-gray-600">
                <li>Type: <span>{userState.goals.projectType}</span></li>
                <li>Location: <span>{userState.goals.location}</span></li>
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
);

// PAGE 6: Plan & Launch Co-Owned Project
const PagePlan = ({ onNext, userState }: { onNext: any, userState: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan & Launch Project</h2>
        <p className="text-gray-600 mb-6">You and {userState.partner} can now use this collaborative space to plan your project before acquiring the land.</p>
        <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Project Milestones</h3>
            <ul className="space-y-3">
                <li className="flex items-center">
                    <input type="checkbox" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" defaultChecked disabled />
                    <label className="ml-3 text-gray-700">Finalize Co-Ownership Agreement</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" defaultChecked disabled />
                    <label className="ml-3 text-gray-700">Secure Project Deposits</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label className="ml-3 text-gray-700">Identify & Vet Land Listings</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label className="ml-3 text-gray-700">Schedule Land Surveys & Due Diligence</label>
                </li>
            </ul>
        </div>
        <button 
            onClick={() => onNext('page-deposit')}
            className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
            Secure Deposit Payment
        </button>
    </div>
);

// PAGE 7: Secure Deposit Payment
const PageDeposit = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Secure Deposit Payment</h2>
        <p className="text-gray-600 mb-6">A small, refundable deposit secures your partnership and unlocks the land acquisition tools.</p>
        <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Deposit Summary</h3>
            <p className="text-gray-600">Your Share (50%): <span className="font-bold text-2xl text-gray-900">₦250,000</span></p>
            <p className="text-gray-600 mt-2">Partner's Share (50%): <span className="text-green-600 font-medium">Paid</span></p>
            
            <form className="space-y-4 mt-6">
                <div>
                    <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input type="text" id="card" defaultValue="**** **** **** 4242" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3" disabled />
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry</label>
                        <input type="text" id="expiry" defaultValue="12 / 28" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3" disabled />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                        <input type="text" id="cvc" defaultValue="***" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3" disabled />
                    </div>
                </div>
            </form>
        </div>
        {/* THIS IS THE SEAMLESS TRANSITION */}
        <button 
            onClick={() => onNext('page-acquire-land-start')}
            className="action-btn w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
            Pay Deposit & Start Acquiring Land
        </button>
    </div>
);

// PAGE 8: Acquire Land - Start
const PageAcquireLandStart = ({ onNext, userState }: { onNext:any, userState: any}) => {
    // Simple budget doubling simulation
    const userBudget = parseInt(userState.goals.budget.replace('₦', '').replace(/,/g, ''));
    const combinedBudget = `₦${(userBudget * 2).toLocaleString()}`;
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Acquire Your Land</h2>
            <p className="text-gray-600 mb-6">
                Congratulations! Your partnership is formalized and the deposit is secured. Now, let's find the perfect piece of land for your project.
            </p>
            {/* NO REPETITION: Data is pulled from the previous flow */}
            <div className="border rounded-lg p-6 bg-main-10 shadow-inner border-blue-200">
                <h3 className="font-semibold text-lg text-main-100 mb-4">Your Project Brief</h3>
                <p className="text-main-100"><span className="font-medium">Partners:</span> You & {userState.partner}</p>
                <p className="text-main-100"><span className="font-medium">Project Type:</span> {userState.goals.projectType}</p>
                <p className="text-main-100"><span className="font-medium">Target Location:</span> {userState.goals.location}</p>
                <p className="text-main-100"><span className="font-medium">Combined Budget:</span> {combinedBudget}</p>
            </div>
            <button 
                onClick={() => onNext('page-acquire-land-listings')}
                className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Search Land Listings
            </button>
        </div>
    );
};

// PAGE 9: Acquire Land - Listings
const PageAcquireLandListings = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Land Listings Matching Your Goals</h2>
        <p className="text-gray-600 mb-6">Based on your brief, here are the top 3 matches. (Simulation)</p>
        <div className="space-y-4">
            {/* Mock Listing 1 */}
            <div className="border border-blue-300 bg-main-10 p-4 rounded-lg flex items-center justify-between shadow-sm ring-2 ring-main-100">
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/100x80/A5B4FC/312E81?text=Land" alt="Land" className="w-24 h-20 rounded-lg object-cover" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">10 Plots, Epe</h3>
                        <p className="text-gray-600">Location: <span className="font-medium text-gray-800">Epe, Lagos</span>.</p>
                        <p className="text-lg font-bold text-main-100">₦130,000,000</p>
                    </div>
                </div>
                <button 
                    onClick={() => onNext('page-acquire-land-due-diligence')}
                    className="action-btn bg-main-100 hover:bg-main-100 text-white font-bold py-2 px-5 rounded-lg shadow transition duration-300"
                >
                    Select
                </button>
            </div>
            {/* Mock Listing 2 */}
            <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between shadow-sm opacity-80">
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/100x80/E0E7FF/4F46E5?text=Land" alt="Land" className="w-24 h-20 rounded-lg object-cover" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">2 Plots, Ibeju-Lekki</h3>
                        <p className="text-gray-600">Location: <span className="font-medium text-gray-800">Ibeju-Lekki, Lagos</span>.</p>
                        <p className="text-lg font-bold text-main-100">₦90,000,000</p>
                    </div>
                </div>
                <button className="bg-gray-300 text-gray-600 font-bold py-2 px-5 rounded-lg cursor-not-allowed">Select</button>
            </div>
        </div>
    </div>
);

// PAGE 10: Acquire Land - Due Diligence
const PageAcquireLandDueDiligence = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Due Diligence</h2>
        <p className="text-gray-600 mb-6">You've selected "10 Plots, Epe". Now, complete the due diligence checklist with your partners.</p>
        <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Due Diligence Checklist</h3>
            <ul className="space-y-3">
                <li className="flex items-center">
                    <input type="checkbox" id="dd1" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd1" className="ml-3 text-gray-700">Order Property Survey</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" id="dd2" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd2" className="ml-3 text-gray-700">Complete Title Search (C of O)</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" id="dd3" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd3" className="ml-3 text-gray-700">Verify Zoning & Restrictions</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" id="dd4" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd4" className="ml-3 text-gray-700">Conduct Soil & Water Tests</label>
                </li>
            </ul>
        </div>
        <button 
            onClick={() => onNext('page-acquire-land-finalize')}
            className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
            Mark as Complete & Initiate Purchase
        </button>
    </div>
);

// PAGE 11: Acquire Land - Finalize
const PageAcquireLandFinalize = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Finalize Acquisition</h2>
        <p className="text-gray-600 mb-6">All checks are complete. Review the final purchase agreement and complete the acquisition.</p>
        <div className="border rounded-lg p-6 bg-green-50 shadow-inner border-green-200">
            <h3 className="font-semibold text-lg text-green-800 mb-4">Final Purchase Summary</h3>
            <p className="text-green-700"><span className="font-medium">Property:</span> 10 Plots, Epe</p>
            <p className="text-green-700"><span className="font-medium">Final Price:</span> ₦130,000,000</p>
            <p className="text-green-700"><span className="font-medium">Your Share (50%):</span> ₦65,000,000</p>
            <p className="text-green-700"><span className="font-medium">Partner Share (50%):</span> ₦65,000,000</p>
            <p className="text-green-700 mt-4"><span className="font-medium">Closing Date:</span> Est. 30 Days</p>
        </div>
        <button 
            onClick={() => onNext('page-done')}
            className="action-btn w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
            Sign & Complete Acquisition
        </button>
    </div>
);

// PAGE 12: Done (Confirmation)
const PageDone = ({ onNext }: { onNext: any }) => (
    <div className="text-center">
        {/*  */}
        <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">You are now the proud co-owner of "10 Plots, Epe". Your project is officially underway.
        </p>
        <button 
            onClick={() => onNext('page-start')}
            className="action-btn bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
        >
            Back to Home
        </button>
    </div>
);

// --- Main App Component ---

export default function App() {
    const [userState, setUserState] = useState(initialUserState);
    const [currentPageId, setCurrentPageId] = useState(flowSteps[0].id);

    const handleNextPage = (pageId: string) => {
        // Reset to start if 'page-start' is clicked from the end
        if (pageId === 'page-start') {
            setUserState(initialUserState);
            setCurrentPageId('page-start');
        } else {
            setCurrentPageId(pageId);
        }
    };

    const renderPage = () => {
        switch (currentPageId) {
            case 'page-start':
                return <PageStart onNext={handleNextPage} />;
            case 'page-goals':
                return <PageGoals onNext={handleNextPage} userState={userState} setUserState={setUserState} />;
            case 'page-matches':
                return <PageMatches onNext={handleNextPage} setUserState={setUserState} />;
            case 'page-chat':
                return <PageChat onNext={handleNextPage} userState={userState} />;
            case 'page-formalize':
                return <PageFormalize onNext={handleNextPage} userState={userState} />;
            case 'page-plan':
                return <PagePlan onNext={handleNextPage} userState={userState} />;
            case 'page-deposit':
                return <PageDeposit onNext={handleNextPage} />;
            case 'page-acquire-land-start':
                return <PageAcquireLandStart onNext={handleNextPage} userState={userState} />;
            case 'page-acquire-land-listings':
                return <PageAcquireLandListings onNext={handleNextPage} />;
            case 'page-acquire-land-due-diligence':
                return <PageAcquireLandDueDiligence onNext={handleNextPage} />;
            case 'page-acquire-land-finalize':
                return <PageAcquireLandFinalize onNext={handleNextPage} />;
            case 'page-done':
                return <PageDone onNext={handleNextPage} />;
            default:
                return <PageStart onNext={handleNextPage} />;
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center sm:p-8 bg-gray-100 font-sans">
            <div className="w-full max-w-4xl mx-auto pt-24">
                {/* Main Stepper / Progress Bar */}
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">Your Co-Ownership Journey</h1>
                <Stepper steps={flowSteps} currentStepId={currentPageId} />

                {/* Main App Container */}
                <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
}

