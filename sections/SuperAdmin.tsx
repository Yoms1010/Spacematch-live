"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Loader } from 'lucide-react'; // A common choice for loading spinners
import axiosClient from '@/axios-server';
import Analysis from '@/components/Analysis';

// --- 1. Type Safety: Define interfaces for your API data ---
// This eliminates 'any' and provides autocompletion and type checking.
interface Vendor {
  id: number;
  name: string;
  // ... other vendor properties
}

interface Client {
  id: number;
  name: string;
  // ... other client properties
}

interface Agent {
  id: number;
  name: string;
  // ... other agent properties
}

interface Property {
  id: number;
  name: string;
  total_cost: string | number; // Can be string or number from API
  // ... other property properties
}

// --- 2. Centralized State Management ---
// Consolidate related states into a single object for easier management.
interface DashboardData {
  vendors: Vendor[];
  clients: Client[];
  agents: Agent[];
  properties: Property[];
}

function SuperAdmin({vendors, clients, agents, properties}: DashboardData | any) {
  // Use a single state object for all dashboard data
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // --- 4. Derived State Calculation with useMemo ---
  // This is more efficient than useState because it only recalculates when `data.properties` changes.
  const totalPropertyValue = useMemo(() => {
    if (!data?.properties) return 0;

    return properties.reduce((sum: number, property: { total_cost: any; }) => {
      const cost = Number(property.total_cost);
      return sum + (isNaN(cost) ? 0 : cost);
    }, 0);
  }, [properties]);

  // --- 5. Robust Loading and Error States ---
  // Provide clear feedback to the user during data fetching or if an error occurs.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Loader className="animate-spin text-blue-500" size={48} />
        <span className="ml-4 text-lg text-gray-600">Loading Dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }
  
  // --- 6. Maintainability: Data-driven rendering ---
  // Create an array of data points to map over, making the JSX cleaner and easier to update (DRY principle).
  const analysisCards = [
    { title: 'Vendors', value: vendors?.length || 0 },
    { title: 'Clients', value: clients?.length || 0 },
    { title: 'Agents', value: agents?.length || 0 },
    { title: 'Properties Available', value: properties?.length || 0 },
    { title: 'Total Property Cost', value: `$${totalPropertyValue.toLocaleString()}` },
    { title: 'Total Property Sold', value: '$0' }, // Placeholder as in original code
  ];

  return (
    <div>
      <div className='row charts'>
        {analysisCards.map((card) => (
          <Analysis
            key={card.title}
            title={card.title}
            data={card.value}
            day='Since January'
            percentage={100}
            labels={[]} // Kept as per original code, can be customized if needed
          />
        ))}
      </div>
    </div>
  );
}

export default SuperAdmin;
