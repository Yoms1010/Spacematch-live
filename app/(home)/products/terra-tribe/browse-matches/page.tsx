'use client'

import { nigeria } from '@/constants';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';

// --- Type Definitions ---
interface StateData {
    state: string;
    lgas: string[];
}

interface MatchGoal {
    budget: number;
    location: string;
    share: string;
}

interface Match {
    id: number;
    name: string;
    score: number;
    bio: string;
    goals: MatchGoal;
    image: string;
}

// --- Mock Data ---
const statesAndLgas: StateData[] = [
    { state: "Lagos", lgas: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa"] },
    { state: "Ogun", lgas: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Ewekoro", "Ifo"] },
    { state: "Abuja", lgas: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali"] }
];

const mockMatches: Match[] = [
    {
        id: 1,
        name: "Aisha & John",
        score: 95,
        bio: "Looking for a modern, shared home for investment purposes in Lagos.",
        goals: { budget: 12000000, location: "Ikeja, Lagos", share: "50%" },
        image: "https://placehold.co/600x400/C89F5B/FFFFFF?text=Aisha+%26+John"
    },
    {
        id: 2,
        name: "The Future Group",
        score: 88,
        bio: "Interested in a vacation home project with a small group of like-minded people.",
        goals: { budget: 10000000, location: "Abaji, Abuja", share: "33%" },
        image: "https://placehold.co/600x400/5C8A79/FFFFFF?text=Future+Group"
    },
    {
        id: 3,
        name: "Oluwabunmi",
        score: 75,
        bio: "Entrepreneur aiming to start an Airbnb business in a vibrant area.",
        goals: { budget: 15000000, location: "Abeokuta North, Ogun", share: "50%" },
        image: "https://placehold.co/600x400/6D28D9/FFFFFF?text=Oluwabunmi"
    },
    {
        id: 4,
        name: "Tech & Travel",
        score: 82,
        bio: "Two developers seeking a property with high rental yield potential.",
        goals: { budget: 13500000, location: "Alimosho, Lagos", share: "25%" },
        image: "https://placehold.co/600x400/94A3B8/FFFFFF?text=Tech+%26+Travel"
    },
];

// --- Sub-Components ---

// 1. Match Card Component
interface MatchCardProps {
    match: Match;
    onConnectClick: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onConnectClick }) => (
    // Replaced custom CSS hover with Tailwind utilities
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl hover:scale-[1.01] transition duration-300">
        <img 
            src={match.image} 
            alt={match.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={(e: any) => e.target.src = 'https://placehold.co/600x400/D1D5DB/1F2937?text=Profile'}
        />
        <div className="p-5">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">{match.name}</h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-inner">
                    {match.score}% Match
                </span>
            </div>
            <p className="text-gray-600 mt-1 mb-3 text-sm line-clamp-2">{match.bio}</p>
            <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Budget:</strong> ₦{match.goals.budget.toLocaleString()}</p>
                <p><strong>Location:</strong> {match.goals.location}</p>
                <p><strong>Share:</strong> {match.goals.share}</p>
            </div>
            <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors shadow-md">
                    Shortlist
                </button>
                <button 
                    className="flex-1 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                    onClick={onConnectClick}
                >
                    Connect
                </button>
            </div>
        </div>
    </div>
);

// 2. Subscription Modal Component
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscriptionModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        // Modal overlay
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50">
            {/* Modal content */}
            <div className="relative p-6 sm:p-8 border w-full max-w-sm shadow-2xl rounded-xl bg-white animate-fade-in">
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">Unlock Connections</h3>
                <p className="text-gray-600 text-center mb-6">
                    A subscription is required to connect with this partner and view their full profile.
                </p>
                <div className="flex justify-center">
                    <a 
                        href="https://space-match.onrender.com/pricing.html" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-purple-700 transition-colors duration-300 transform hover:scale-[1.02]"
                    >
                        Subscribe Now
                    </a>
                </div>
                <div className="text-right mt-6">
                    <button onClick={onClose} className="text-sm text-gray-500 hover:text-purple-600 font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main BrowseMatchesPage Component ---
const BrowseMatchesPage: React.FC = () => {
    const router = useRouter()
    const [filterState, setFilterState] = useState('');
    const [filterLga, setFilterLga] = useState('');
    const [filterBudget, setFilterBudget] = useState('');
    const [filterShare, setFilterShare] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(true)

    // Filter Logic: Available LGAs based on selected state
    const availableLgas = useMemo(() => {
        const stateData = nigeria.find(item => item.state === filterState);
        return stateData ? ['All LGAs', ...stateData.lga] : ['All LGAs'];
    }, [filterState]);

    // Handler for State change (resets LGA filter)
    const handleStateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterState(e.target.value);
        setFilterLga('');
    }, []);

    // Filter Logic: Apply all filters to the mock data
    const filteredMatches = useMemo(() => {
        // 1. Parse Budget
        let maxBudget = filterBudget ? parseInt(filterBudget.replace(/[^0-9]/g, ''), 10) : Infinity;
        if (isNaN(maxBudget)) maxBudget = Infinity;

        return mockMatches.filter(match => {
            // Check 1: Budget
            const budgetMatch = match.goals.budget <= maxBudget;

            // Check 2: Share
            const shareMatch = !filterShare || filterShare === 'All Shares' || match.goals.share === filterShare;

            // Check 3 & 4: Location (State and LGA)
            // Note: Location filtering checks if the location string includes the filter value.
            const stateMatch = !filterState || filterState === 'All States' || match.goals.location.includes(filterState);
            const lgaMatch = !filterLga || filterLga === 'All LGAs' || match.goals.location.includes(filterLga);

            return budgetMatch && shareMatch && stateMatch && lgaMatch;
        });
    }, [filterState, filterLga, filterBudget, filterShare]);

    function handleConnectWithMatch(id: number): void {
        // throw new Error('Function not implemented.');
        switch (isSubscribed) {
            case true:
                router.push("/products/terra-tribe/browse-matches/connect")
                break;
            case true:
                setIsModalOpen(true)
                break;
        
            default:
                break;
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-10 font-['Inter']">
            <div className="mx-auto" style={{ maxWidth: '1200px' }}>
                
                {/* --- Header --- */}
                <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center border-b-4 border-purple-600">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Browse & Filter Matches</h1>
                    <p className="mt-2 text-md text-gray-600">
                        View potential co-owners that align with your vision.
                    </p>
                </header>

                <main className="w-full">
                    
                    {/* --- Filter Section --- */}
                    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Refine Your Search</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            
                            {/* Location Filter (State) */}
                            <select 
                                id="stateFilter" 
                                value={filterState} 
                                onChange={handleStateChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                            >
                                <option value="">All States</option>
                                {nigeria.map(item => (
                                    <option key={item.state} value={item.state}>{item.state}</option>
                                ))}
                            </select>
                            
                            {/* Location Filter (LGA) - Dependent */}
                            <select 
                                id="lgaFilter" 
                                value={filterLga}
                                onChange={(e) => setFilterLga(e.target.value)}
                                disabled={!filterState}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm ${!filterState ? 'bg-gray-200 text-gray-500' : 'bg-white'}`}
                            >
                                {availableLgas.map(lga => (
                                    <option key={lga} value={lga === 'All LGAs' ? '' : lga}>
                                        {lga}
                                    </option>
                                ))}
                            </select>
                            
                            {/* Budget Filter */}
                            <input 
                                type="text" 
                                id="budgetFilter" 
                                value={filterBudget}
                                onChange={(e) => setFilterBudget(e.target.value)}
                                placeholder="Max Budget (e.g., ₦15,000,000)" 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                            />

                            {/* Ownership Share Filter */}
                            <select 
                                id="shareFilter" 
                                value={filterShare}
                                onChange={(e) => setFilterShare(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                            >
                                <option value="">All Shares</option>
                                <option value="50%">50%</option>
                                <option value="33%">33%</option>
                                <option value="25%">25%</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* --- Match Profiles Section --- */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Potential Matches ({filteredMatches.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMatches.length > 0 ? (
                                filteredMatches.map(match => (
                                    <MatchCard 
                                        key={match.id} 
                                        match={match} 
                                        onConnectClick={() => handleConnectWithMatch(match.id)} 
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center py-10 text-lg rounded-xl bg-white shadow-inner">
                                    No matches found matching your current criteria. Try adjusting your filters!
                                </p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Subscription Modal Renders here */}
            <SubscriptionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default BrowseMatchesPage;
