'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// --- Type Definitions ---
// Defines the shape of a property object for type safety.
interface Property {
    id: number;
    title: string;
    location: string;
    size: number;
    image: string;
    matchPreferences: string[];
}

// Defines the props for the PropertyCard component.
interface PropertyCardProps {
    property: Property;
    onSave: (id: number) => void;
    onCompare: (id: number) => void;
    onRequestInfo: (id: number) => void;
    isComparing: boolean;
}


// --- Mock Data ---
// The data array is now typed using the Property interface.
const mockProperties: Property[] = [
    {
        id: 1,
        title: "Prime Land in Ikeja",
        location: "Ikeja, Lagos",
        size: 1000,
        image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Ikeja+Land",
        matchPreferences: [
            "Investment property",
            "Budget: $150k - $200k",
            "Timeline: Within 12 months"
        ]
    },
    {
        id: 2,
        title: "Residential Plot in Abuja",
        location: "Gwagwalada, Abuja",
        size: 750,
        image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Abuja+Plot",
        matchPreferences: [
            "Vacation home",
            "Budget: $100k - $150k",
            "Partner type: Small group"
        ]
    },
    {
        id: 3,
        title: "Rural Land in Ogun",
        location: "Odeda, Ogun",
        size: 2000,
        image: "https://placehold.co/600x400/D1D5DB/1F2937?text=Ogun+Land",
        matchPreferences: [
            "Airbnb project",
            "Budget: $80k - $120k",
            "Shared values: Sustainability"
        ]
    }
];


// --- SVG Icons (Typed as React Functional Components) ---

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);


// --- PropertyCard Component ---
// This component is typed with React.FC<PropertyCardProps> to enforce the prop types.

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSave, onCompare, onRequestInfo, isComparing }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1.5 hover:shadow-xl">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                    <LocationIcon />
                    <span>{property.title}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">{property.location} - {property.size} sqM</p>

                <div className="mt-4">
                    <h4 className="font-bold text-gray-800 mb-2">Match Preferences:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                        {property.matchPreferences.map((pref, index) => (
                            <li key={index}>
                                <CheckIcon />
                                <span>{pref}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex space-x-2">
                    <button
                        onClick={() => onSave(property.id)}
                        className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => onCompare(property.id)}
                        className={`flex-1 font-semibold py-2 px-4 rounded-md transition-colors ${
                            isComparing
                                ? 'bg-blue-200 text-blue-800 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        disabled={isComparing}
                    >
                        {isComparing ? 'Added to Compare' : 'Compare'}
                    </button>
                </div>
                <button
                    onClick={() => onRequestInfo(property.id)}
                    className="w-full mt-4 bg-purple-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-purple-700 transition-colors"
                >
                    Request More Info
                </button>
            </div>
        </div>
    );
};


// --- Main Page Component ---

const MatchedPropertiesPage: React.FC = () => {
    const router = useRouter()
    const [savedProperties, setSavedProperties] = useState<number[]>([]);
    const [comparedProperties, setComparedProperties] = useState<number[]>([]);
    const [isActionTaken, setIsActionTaken] = useState<boolean>(false);

    // Function parameters are typed, ensuring `id` is always a number.
    const handleSave = (id: number): void => {
        if (!savedProperties.includes(id)) {
            setSavedProperties([...savedProperties, id]);
            alert(`Property ${id} saved!`);
            setIsActionTaken(true);
        } else {
            alert(`Property ${id} is already saved.`);
        }
    };

    const handleCompare = (id: number): void => {
        if (!comparedProperties.includes(id)) {
            if (comparedProperties.length < 3) {
                setComparedProperties([...comparedProperties, id]);
                setIsActionTaken(true);
            } else {
                alert('You can only compare up to 3 properties at a time.');
            }
        } else {
            alert('Property is already in the comparison list.');
        }
    };

    const handleRequestInfo = (id: number): void => {
        alert(`Requesting more information for Property ID: ${id}. A specialist will contact you shortly.`);
        setIsActionTaken(true);
    };
    
    const handleCompareClick = (): void => {
        const propertyTitles = comparedProperties.map(id => {
            const property = mockProperties.find(p => p.id === id);
            return property ? property.title : 'Unknown Property';
        }).join(', ');
        alert(`Comparing properties: ${propertyTitles}`);
    };

    // console.log(savedProperties);
    

    const handleProceedClick = (): void => {
        router.push("/property/acquisition/due-diligence")
        alert('Proceeding to Due Diligence for your selected properties.');
    };
    
    const isCompareButtonEnabled = comparedProperties.length >= 2;
    
    return (
        <div className="bg-gray-100 min-h-screen px-6 font-sans pt-28 pb-10">
            <header className="bg-white shadow-sm rounded-xl p-6 mb-8 text-center max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800">Matched Properties</h1>
                <p className="mt-2 text-lg text-gray-600">
                    View properties that have potential co-owners with similar preferences.
                </p>
            </header>

            <main className=" mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Your Saved Properties ({savedProperties.length})</h2>
                    <button
                        onClick={handleCompareClick}
                        disabled={!isCompareButtonEnabled}
                        className={`font-bold py-2 px-6 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isCompareButtonEnabled
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-400 text-white'
                        }`}
                    >
                        Compare ({comparedProperties.length})
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProperties.map(property => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onSave={handleSave}
                            onCompare={handleCompare}
                            onRequestInfo={handleRequestInfo}
                            isComparing={comparedProperties.includes(property.id)}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={handleProceedClick}
                        disabled={!isActionTaken}
                        className={`font-bold py-4 px-8 rounded-md shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isActionTaken
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-gray-400 text-white'
                        }`}
                    >
                        Proceed to Due Diligence
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MatchedPropertiesPage;