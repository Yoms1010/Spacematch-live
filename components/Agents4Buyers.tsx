'use client'


import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import { FaComment, FaEye } from 'react-icons/fa6';
import axiosClient from '@/axios-client';
import Link from 'next/link';
import Image from 'next/image';

DataTable.use(DT);

interface BuyerIdProps {
  buyerId: any
} 

function Agents4Buyers({buyerId}: BuyerIdProps) {

  const [matchedProperty, setMatchedProperty] = useState<any>()
  // console.log(buyer);
  
  
    useEffect(() => {
      const getMatchedProperty = async () => {
        await axiosClient.get(`/matches/buyer/1`)
        .then((data) => {
          setMatchedProperty(data.data)
          console.log(data.data);
          })
        .catch(err => console.log(err));
      }

      getMatchedProperty()
    }, [])

    // console.log(buyerId);
    

  function onView(id: any): void {
    throw new Error('Function not implemented.');
  }

  if (!matchedProperty) {
    return (
        <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
          <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
        </div>
      )
  }

  return (
    <div className='mx-10 mb-5 bg-white p-2'>
      <DataTable className="display">
          <thead >
              <tr className='justify-start'>
                  <th scope='row'>#</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>LGA</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Property</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody className='text-left'>
              {
                matchedProperty
                  ?
                matchedProperty.map((item: any, i: any) => (
                  <tr className='text-left' key={i}>
                    <td>{i}</td>
                    <td>{item.agent.name}</td>
                    <td>{item.agent.city}</td>
                    <td>{item.agent.lga}</td>
                    <td>{item.agent.state}</td>
                    <td>{item.agent.country}</td>
                    <td>{item.property.title}</td>
                    <td>
                    <Link href="/in/chat" className='flex items-center space-x-3 border p-2 hover:bg-black-1/10'>
                        <FaComment
                            size={22}
                            onClick={() => onView(item.property.id)}
                            className='cursor-pointer text-main-100'
                        />
                        &nbsp;
                        Chat
                    </Link>
                    </td>
                </tr>
                ))
                : 
                <tr className='text-left'>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>No Data Found</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>
                      view
                    </td>
                </tr>
              }
          </tbody>
      </DataTable>
    </div>
  )
}

export default Agents4Buyers