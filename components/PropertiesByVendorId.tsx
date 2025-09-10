'use client'


import axiosClient from '@/axios-client';
import React, { useEffect, useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa6';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import { useRouter } from 'next/navigation';

DataTable.use(DT);


type PropertyIdProps = {
    id: string;
}
function PropertiesByVendorId({id}: PropertyIdProps) {

    const router = useRouter()
    const [property, setProperty] = useState<any>()
    
        const [pricePerSquaremeter, setPricePerSquaremeter] = useState(0)
    
        const fetchProperty = () => {
          axiosClient.get(`/developer/${id}`)
          .then((data) => {
            console.log(data.data);
            setProperty(data.data.data.property_by_vendor);
          }) 
          .catch((error) => {})
        }
        
        useEffect(() => {
          fetchProperty();
        }, [])
        

    function onDelete(id: any): void {
        throw new Error('Function not implemented.');
    }

    const onView = (id: any) => {
        // Navigate to property page
        router.push(`/in/vendors/properties/images/${id}`)
      }
      

  return (
    <div className='bg-white p-5'>
        <DataTable className="display">
            <thead >
                <tr className='justify-start'>
                    <th scope='row'>#</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Cost Per Squaremtres</th>
                    <th className='text-left'>Total Cost</th>
                    <th>Date Matched</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='text-left'>
                {
                    property ? property.map((item: any, i: any) => (
                    <tr className='text-left' key={i}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{`${item.city} ${item.lga} ${item.state} ${item.country}`}</td>
                        <td>${item.cost_per_sqm}</td>
                        <td>${item.total_cost}</td>
                        <td>{item.created_at.split("T")[0]}</td>
                        <td>
                        <div className='flex items-center space-x-3'>
                            <FaEye
                                size={22}
                                onClick={() => onView(item.id)}
                                className='cursor-pointer text-main-100'
                            />
                            <FaTrash
                                size={22}
                                onClick={() => onDelete(item.id)}
                                className='text-red-500 cursor-pointer'
                            />
                        </div>
                        </td>
                    </tr>
                    ))
                    :
                    ""
                }
            </tbody>
        </DataTable>
    </div>
  )
}

export default PropertiesByVendorId
