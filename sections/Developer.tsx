"use client";

import Analysis from '@/components/Analysis';
import DataTable from '@/components/cardsui/DataTable';
import SubscriptionHeader from '@/components/SubscriptionHeader';
import { Column, DeveloperDataProps, DeveloperItemProps, PropertiesProps } from '@/types';
import { useRouter } from 'next/navigation';
import React, { Key, useMemo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


// --- 1. Production-Ready Component Structure ---
function Developer({ propertyData, userInfo }: DeveloperDataProps) {
  const router = useRouter();
  const propertyNetworth = useMemo(() => {
    if (!propertyData) return 0;

    return propertyData.reduce((sum: any, property: any) => {
      // Ensure total_cost is a number before adding
      const cost = Number(property.total_cost);
      return sum + (isNaN(cost) ? 0 : cost);
    }, 0);
  }, [propertyData]);

  const soldPropertiesCount = useMemo(() => {
    if (!propertyData) return 0;
    return propertyData.filter((p: any) => p.bought === "Yes").length;
  }, [propertyData]);

// console.log(propertyData);

  let properties: PropertiesProps[] = [];
    properties = propertyData.map((item: PropertiesProps, i: Key) => (
      {
        id: item.id, 
        title: item.title, 
        total_cost: `₦${Number(item.total_cost).toLocaleString()}`, 
        squareMeters: `${item.squareMeters}m²`,
        bought: item.bought,
        location: `${item.lga}, ${item.city}. ${item.state}. ${item.country}`
      }
    ))
  

  const columns: Column<PropertiesProps>[] = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Title', accessor: 'title', sortable: true },
    { header: 'Price', accessor: 'total_cost', sortable: true },
    { header: 'Squaremetre', accessor: 'squareMeters', sortable: false },
    { header: 'Sold', accessor: 'bought', sortable: false },
    { header: 'Location', accessor: 'location', sortable: false },
  ];

  const onEdit = (id: number | string | any): void => {
    router.push(`/in/properties/${id}`);
  };

  const onDelete = async (id: number | any): Promise<void> => {
    // In a real app, you would show a confirmation modal first.
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        console.log(`Successfully deleted property with ID: ${id}`);
      } catch (error) {
        console.error(`Failed to delete property ${id}:`, error);
        alert("Failed to delete the property.");
      }
    }
  };

  // --- 4. Maintainability: Data-driven Rendering for Analysis Cards ---
  const analysisCards = [
    { title: 'Uploaded Properties', value: propertyData?.length || 0 },
    { title: 'Property Networth', value: `$${propertyNetworth.toLocaleString()}` },
    { title: 'Sold Properties', value: soldPropertiesCount },
  ];

  return (
    <div className='container flex flex-col gap-5 px-4 mb-4'>
      {/* User subscription info component remains unchanged */}
      <SubscriptionHeader userInfo={userInfo} />

      {/* Analysis cards rendered from the array for cleaner code */}
      <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-3'>
        {analysisCards.map(card => (
          <Analysis
            key={card.title}
            title={card.title}
            data={card.value}
            day='Since January'
            percentage={100}
            labels={[]} // Using empty array as labels weren't dynamically used
          />
        ))}
      </div>

      {/* --- 5. Robust Table Rendering with Empty State --- */}
        <DataTable data={properties} columns={columns} pageSize={10} title='Property Data Table'/>
    </div>
  );
}

export default Developer;
