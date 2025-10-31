
'use client'

import { nigeria } from '@/constants';
import { PropertyItemProps } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const states = [
  { name: 'Lagos', lgas: ['Ikeja', 'Surulere', 'Victoria Island'] },
  { name: 'Ogun', lgas: ['Abeokuta North', 'Ijebu East', 'Odeda'] },
  { name: 'Abuja', lgas: ['Bwari', 'Gwagwalada', 'Kuje'] },
];


const ChooseLand = ({properties}: {properties: PropertyItemProps[]}) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [minSize, setMinSize] = useState('');
  const [docsVerified, setDocsVerified] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(properties && properties);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const lgasForState = selectedState
    ? nigeria.find((s) => s.state === selectedState)?.lga || []
    : [];

  const router = useRouter()

  useEffect(() => {
    const filterAndRender = () => {
      const filtered = properties.filter((property) => {
        const stateMatch = !selectedState || property.state.includes(selectedState);
        const lgaMatch = !selectedLga || property.lga.includes(selectedLga);
        const sizeMatch = !minSize || property.squareMeters >= parseInt(minSize);
        const docsMatch = !docsVerified || property.docsVerified;
        return stateMatch && lgaMatch && sizeMatch && docsMatch;
      });
      setFilteredProperties(filtered);
    };

    filterAndRender();
  }, [selectedState, selectedLga, minSize, docsVerified]);

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedLga('');
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

    localStorage.setItem("selected_land_id", propertyId)
    router.push(`/property/${propertyId}`)
  };

  const handleProceedClick = () => {
    if (selectedPropertyId) {
      alert(`Proceeding to financing with selected property ID: ${selectedPropertyId}`);
    } else {
      alert('Please select a property first.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-inter py-20">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              id="stateFilter"
              className="w-full px-4 py-2 border rounded-md focus:ring-main-100 focus:border-main-100"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">All States</option>
              {nigeria.map((item) => (
                <option key={item.state} value={item.state}>
                  {item.state}
                </option>
              ))}
            </select>
            <select
              id="lgaFilter"
              className="w-full px-4 py-2 border rounded-md focus:ring-main-100 focus:border-main-100"
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
            <input
              type="number"
              id="minSizeFilter"
              placeholder="Min Size (sqM)"
              className="w-full px-4 py-2 border rounded-md focus:ring-main-100 focus:border-main-100"
              value={minSize}
              onChange={handleMinSizeChange}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="docsVerifiedFilter"
                className="h-5 w-5 text-main-100 border-gray-300 rounded focus:ring-main-100"
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
              filteredProperties.map((property: PropertyItemProps) => (
                <div
                  key={property.id}
                  id={`card-${property.id}`}
                  className={`property-card bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden ${selectedPropertyId === property.id ? 'ring-4 ring-main-100' : ''}`}
                  onClick={() => handlePropertyClick(property.id)}
                >
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property?.property_image ? property?.property_image[0]?.path : ""}`} alt={`${property.title}`} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 mt-1">{`${property.lga} ${property.city} ${property.state} ${property.country}`}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">{property.squareMeters} sqM</span>
                      <span className="text-lg font-bold text-main-100">₦{Number(property.total_cost).toLocaleString()}</span>
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
          className={`font-bold py-4 px-8 rounded-md transition-colors duration-300 ${selectedPropertyId ? 'bg-main-100 text-white hover:bg-main-100' : 'bg-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
          disabled={!selectedPropertyId}
          onClick={handleProceedClick}
        >
          Proceed to Financing
        </button>
      </footer>
    </div>
  );
};
export default ChooseLand;