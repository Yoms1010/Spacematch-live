'use client'

import PropertyAcquisitionCard from '@/components/property/PropertyAcquisitionCard';
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


// --- Mock Data ---
// The data array is now typed using the Property interface.
const mockProperties: Property[] = [
    {
        id: 1,
        title: "Prime Land in Ikeja",
        location: "Ikeja, Lagos",
        size: 1000,
        image: "/properties/land-1.jpg",
        matchPreferences: [
            "Investment property",
            "Budget: ₦150M - ₦200M",
            "Timeline: Within 12 months"
        ]
    },
    {
        id: 2,
        title: "Residential Plot in Abuja",
        location: "Gwagwalada, Abuja",
        size: 750,
        image: "/properties/land-2.jpg",
        matchPreferences: [
            "Vacation home",
            "Budget: ₦100M - ₦150M",
            "Partner type: Small group"
        ]
    },
    {
        id: 3,
        title: "Rural Land in Ogun",
        location: "Odeda, Ogun",
        size: 2000,
        image: "/properties/land-3.jpg",
        matchPreferences: [
            "Airbnb project",
            "Budget: ₦80M - ₦120M",
            "Shared values: Sustainability"
        ]
    }
];

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
                        <PropertyAcquisitionCard
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