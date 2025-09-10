// App.jsx or Index.jsx
'use client'

import React, { useState, useEffect } from 'react';

const states = [
  { name: 'Lagos', lgas: ['Ikeja', 'Surulere', 'Victoria Island'] },
  { name: 'Ogun', lgas: ['Abeokuta North', 'Ijebu East', 'Odeda'] },
  { name: 'Abuja', lgas: ['Bwari', 'Gwagwalada', 'Kuje'] },
];

const mockProperties = [
  {
    id: 1,
    title: 'Prime Land in Victoria Island',
    location: 'Victoria Island, Lagos',
    size: 1000,
    price: 250000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Victoria+Island+Land',
  },
  {
    id: 2,
    title: 'Residential Plot in Ikeja',
    location: 'Ikeja, Lagos',
    size: 750,
    price: 150000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Ikeja+Plot',
  },
  {
    id: 3,
    title: 'Rural Land in Odeda',
    location: 'Odeda, Ogun',
    size: 2000,
    price: 50000,
    docsVerified: false,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Odeda+Land',
  },
  {
    id: 4,
    title: 'Commercial Land in Bwari',
    location: 'Bwari, Abuja',
    size: 1500,
    price: 180000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Bwari+Plot',
  },
  {
    id: 5,
    title: 'Family Plot in Surulere',
    location: 'Surulere, Lagos',
    size: 500,
    price: 120000,
    docsVerified: true,
    image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Surulere+Plot',
  },
];

const App = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [minSize, setMinSize] = useState('');
  const [docsVerified, setDocsVerified] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const lgasForState = selectedState
    ? states.find((s) => s.name === selectedState)?.lgas || []
    : [];

  // useEffect to handle filtering logic whenever state changes
  useEffect(() => {
    const filterAndRender = () => {
      const filtered = mockProperties.filter((property) => {
        const stateMatch = !selectedState || property.location.includes(selectedState);
        const lgaMatch = !selectedLga || property.location.includes(selectedLga);
        const sizeMatch = !minSize || property.size >= parseInt(minSize);
        const docsMatch = !docsVerified || property.docsVerified;
        return stateMatch && lgaMatch && sizeMatch && docsMatch;
      });
      setFilteredProperties(filtered);
    };

    filterAndRender();
  }, [selectedState, selectedLga, minSize, docsVerified]);

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedLga(''); // Reset LGA when state changes
  };

  const handleLgaChange = (e: any) => {
    setSelectedLga(e.target.value);
  };

  const handleMinSizeChange = (e: any) => {
    setMinSize(e.target.value);
  };

  const handleDocsVerifiedChange = (e: any) => {
    setDocsVerified(e.target.checked);
  };

  const handlePropertyClick = (propertyId: any) => {
    setSelectedPropertyId(propertyId);
    alert(`Navigating to property details for ID: ${propertyId}. \n\nCheck out the property details page at https://space-match.onrender.com/property-detail.html`);
  };

  const handleProceedClick = () => {
    if (selectedPropertyId) {
      alert(`Proceeding to financing with selected property ID: ${selectedPropertyId}`);
    } else {
      alert('Please select a property first.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-inter">
      {/* Header Section */}
      <header className="bg-white shadow-sm py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Step 3: Choose Your Land</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find the perfect location for your FlexiHabitat.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* State Filter */}
            <select
              id="stateFilter"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            {/* LGA Filter */}
            <select
              id="lgaFilter"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
              disabled={!selectedState}
              value={selectedLga}
              onChange={handleLgaChange}
            >
              <option value="">All LGAs</option>
              {lgasForState.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>

            {/* Size Filter */}
            <input
              type="number"
              id="minSizeFilter"
              placeholder="Min Size (sqM)"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
              value={minSize}
              onChange={handleMinSizeChange}
            />

            {/* Documents Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="docsVerifiedFilter"
                className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                checked={docsVerified}
                onChange={handleDocsVerifiedChange}
              />
              <label htmlFor="docsVerifiedFilter" className="text-gray-700">
                Documents Verified
              </label>
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Results</h2>
          <div id="resultsContainer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  id={`card-${property.id}`}
                  className={`property-card bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden ${
                    selectedPropertyId === property.id ? 'ring-4 ring-purple-500' : ''
                  }`}
                  onClick={() => handlePropertyClick(property.id)}
                >
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 mt-1">{property.location}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">{property.size} sqM</span>
                      <span className="text-lg font-bold text-purple-600">${property.price.toLocaleString()}</span>
                    </div>
                    <div className="mt-3">
                      {property.docsVerified ? (
                        <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                          Documents Verified
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                          Verification Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No properties found matching your criteria.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-white p-8 mt-12 shadow-sm text-center">
        <button
          id="proceedButton"
          className={`font-bold py-4 px-8 rounded-md transition-colors duration-300 ${
            selectedPropertyId
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
          disabled={!selectedPropertyId}
          onClick={handleProceedClick}
        >
          Proceed to Financing
        </button>
      </footer>
    </div>
  );
};

export default App;