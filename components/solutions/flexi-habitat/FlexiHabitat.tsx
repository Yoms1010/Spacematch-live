import { useRouter } from 'next/navigation';
import React, { useState, useEffect, Key } from 'react';

// Main App component
const FlexiHabitat = () => {
    // State to manage the selected space capsule
    const [selectedCapsule, setSelectedCapsule] = useState<any>(null);
    // State to manage the selected additional features
    const [selectedFeatures, setSelectedFeatures] = useState<any>({});
    // State to hold the total cost
    const [totalCost, setTotalCost] = useState(0);

    const router = useRouter()



    // Data for the space capsules
    const capsules = [
        {
            title: "Studio",
            imageUrl: "/solutions/prefab/capsule-one.jpeg",
            vendorPrice: 15500000,
            shipmentCost: 155000,
        },
        {
            title: "1 Bedroom",
            imageUrl: "/solutions/prefab/capsule2.webp",
            vendorPrice: 74500000,
            shipmentCost: 740000,
        },
        {
            title: "2 Bedroom",
            imageUrl: "/solutions/prefab/capsule-two.jpeg",
            vendorPrice: 145000000,
            shipmentCost: 1450000,
        },
    ];


    const features: any = [
        {
            name: "0.6M Wardrobe",
            value: "wardrobe",
            price: 728257
        },
        {
            name: "Wires, sockets, switches, lights, and water pipes",
            value: "electrical appliance",
            price: 825000
        },
        {
            name: "1.8Hotel mattress 1.8m bed + mattress",
            value: "mattress",
            price: 247500
        },
        {
            name: "SOFA：210*89*80  SOFA BED：185*138*43",
            value: "sofa",
            price: 962500
        },
        {
            name: "3M Cabinet",
            value: "cabinet",
            price: 2838150
        },
        {
            name: "2.04M Hanging cabinet",
            value: "hanging-cabinet",
            price: 661384
        },
        {
            name: "Steps",
            value: "steps",
            price: 324360
        },
        {
            name: "triplex glass",
            value: "glass",
            price: 1351500
        },
        {
            name: "2+3P 2+3P Inverter Heating & Cooling Air-conditioning",
            value: "Inverter;Heating&cooling-AC",
            price: 3458400
        },
        {
            name: "17.1*2.34 curtain",
            value: "curtain",
            price: 973080
        },
        {
            name: "Motorised curtain track",
            value: "motorised-curtain-track",
            price: 810900
        },
        {
            name: "Refrigerator",
            value: "refrigerator",
            price: 675750
        },
        {
            name: "Built-in single-head induction hob",
            value: "inducation-hob",
            price: 243270
        },
        {
            name: "595*595*850mm Washing machine",
            value: "washing-machine",
            price: 946050
        },
        {
            name: "Extractor hoods",
            value: "extractor-hood",
            price: 324360
        }
    ];

    
    // Effect to calculate total cost whenever selectedCapsule or selectedFeatures change
    useEffect(() => {
        let baseCost = 0;
        if (selectedCapsule) {
            baseCost = selectedCapsule.vendorPrice + selectedCapsule.shipmentCost;
        }

        const featuresCost = Object.keys(selectedFeatures).reduce((sum, featureName) => {
            return selectedFeatures[featureName] ? sum + features.find((f: any) => f.name === featureName).price : sum;
        }, 0);

        setTotalCost(baseCost + featuresCost);
    }, [selectedCapsule, selectedFeatures, features]);
    
    // Handler for selecting a space capsule
    const handleCapsuleSelect = (capsule: any) => {
        setSelectedCapsule(capsule);
    };

    // Handler for selecting an additional feature
    const handleFeatureSelect = (featureName: any) => {
        setSelectedFeatures((prevFeatures: any) => ({
            ...prevFeatures,
            [featureName]: !prevFeatures[featureName],
        }));
    };

  function handleSelectLand() {
    localStorage.setItem("selected_solution", "FlexiHabitat")
    localStorage.setItem("selected_capsule", JSON.stringify(selectedCapsule))
    localStorage.setItem("selected_capsule_features", JSON.stringify(selectedFeatures))
    localStorage.setItem("selected_capsule_cost", totalCost.toString())
    router.push("/property/land-selection")
  }

    return (
        <div className="bg-gray-100 min-h-screen font-inter py-32">
            {/* Header Section */}
            <header className="bg-white shadow-sm py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800">Choose Your Space Capsule</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Select the perfect home to fit your lifestyle and customize your features.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                {/* Space Capsule Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {capsules.map((capsule, index) => (
                        <SpaceCapsuleCard
                            key={index}
                            capsule={capsule}
                            isSelected={selectedCapsule && selectedCapsule.title === capsule.title}
                            onSelect={() => handleCapsuleSelect(capsule)}
                        />
                    ))}
                </div>

                {/* Additional Features and Total Cost Section */}
                <div className="bg-white rounded-xl shadow-md p-8 mt-12">
                    <h2 className="text-2xl font-bold text-gray-800">Additional Features & Customization</h2>
                    <p className="mt-4 text-gray-600">
                        Select any additional features you would like to include.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {features.map((feature: any, index: Key) => (
                            <div key={index} className="flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    id={feature.name} 
                                    name={feature.name}
                                    checked={!!selectedFeatures[feature.name]}
                                    onChange={() => handleFeatureSelect(feature.name)}
                                    className="h-5 w-5 text-main-100 border-gray-300 rounded focus:ring-main-100"
                                />
                                <label htmlFor={feature.name} className="text-lg text-gray-700 font-medium">
                                    {feature.name} 
                                    <span className="text-gray-500 font-normal ml-2">(₦{feature.price.toLocaleString()})</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Total Cost Display */}
                <div className="bg-white rounded-xl shadow-md p-8 mt-8 text-center">
                    <p className="text-3xl font-extrabold text-gray-800">
                        Total Cost: <span className={`${totalCost === 0 ? "text-smred-100" : "text-main-100"}`}>₦{totalCost.toLocaleString()}</span>
                    </p>
                    <button
                        className="mt-6 w-full max-w-sm mx-auto bg-main-100 text-white font-semibold py-4 px-8 rounded-md shadow-lg hover:bg-main-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-100"
                        disabled={!selectedCapsule}
                        onClick={handleSelectLand}
                    >
                        Select Land & Continue
                    </button>
                    {!selectedCapsule && (
                        <p className="mt-2 text-red-500 text-sm">Please select a space capsule to continue.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

// Component for each space capsule card
const SpaceCapsuleCard = ({ capsule, isSelected, onSelect }: {capsule: any, isSelected: any, onSelect: any}) => {
    const { title, imageUrl, vendorPrice, shipmentCost } = capsule;
    return (
        <div 
            onClick={onSelect}
            className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer ${isSelected ? 'ring-4 ring-main-100 scale-105' : ''}`}
        >
            <img 
                src={imageUrl} 
                alt={`${title} Space Capsule`} 
                className="w-full h-64 object-cover" 
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="mt-4 space-y-1">
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Vendor Price:</span> ₦{vendorPrice.toLocaleString()}
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Standard Shipment:</span> ₦{shipmentCost.toLocaleString()}
                    </p>
                </div>
                <button
                    onClick={onSelect}
                    className={`mt-6 w-full font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none transition-colors 
                        ${isSelected ? 'bg-main-100 text-white hover:bg-main-100' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    {isSelected ? 'Selected' : 'Select This Capsule'}
                </button>
            </div>
        </div>
    );
};

// Export the main component
export default FlexiHabitat;