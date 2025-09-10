'use client'

import React, { useEffect, useState } from 'react'
import HeaderBox from '@/components/HeaderBox';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import axiosClient from '@/axios-client';
import { useStateContext } from '@/context/ContextProvider';
import { FaEye } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { properties } from '@/constants';

DataTable.use(DT);

interface AgentIdProps {
    agentId: number | string
}

const AgentMatches = ({agentId}: AgentIdProps) => {
    
    const router = useRouter()
    const [agent, setAgent] = useState<any>()

    const [matchedProperty, setMatchedProperty] = useState<any>()
    // const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()

    useEffect(() => {
      const fetchCurrentUser = async () => {
        await axiosClient.get(`/agent/${agentId}`)
        .then((data) => {
            setAgent(data.data.data)
            // console.log(data);
        })
        .catch((error) => {
            console.error(error)
        })
        //matched Property
      }

      fetchCurrentUser()
    }, [])

  // console.log(buyer);
  const getMatchedProperty = async () => {
    await axiosClient.get(`/matches/agent/${agentId}`)
    .then((data) => {
      setMatchedProperty(data.data)
        console.log(data.data);
      })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getMatchedProperty()
  }, [])


const onView = (id: any) => {
  // Navigate to property page
  router.push(`/in/matches/properties/${id}`)
}


return (
  <section className='p-5'>
       <HeaderBox
        title='Matched Properties'
        subtext='Details of properties matched to you'
      />

        <div className='property-table bg-white p-3'>
            <div className='flex justify-end px-3'>
                {/* <button
                    onClick={() => setOpenModal(true)}
                    className='p-2 bg-main-100 text-white rounded hover:shadow-xl flex justify-center items-center'
                >
                   <LiaLinkSolid className='font-semibold text-24'/> &nbsp; Match Property
                </button> */}
            </div>
            <DataTable className="display">
                <thead >
                    <tr className='justify-start'>
                        <th scope='row'>#</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Cost Per Sqm</th>
                        <th className='text-left'>Total Cost</th>
                        <th>Client</th>
                        <th>Date Matched</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-left'>
                    {
                      matchedProperty
                        ?
                      matchedProperty.map((item: any, i: any) => (
                        <tr className='text-left' key={i}>
                          <td>{item.property.id}</td>
                          <td>{item.property.title}</td>
                          <td>{`${item.property.city} ${item.property.lga} ${item.property.state} ${item.property.country}`}</td>
                          <td>${item.property.cost_per_sqm}</td>
                          <td>${item.property.total_cost}</td>
                          <td>{item.buyer.name}</td>
                          <td>{item.property.created_at.split("T")[0]}</td>
                          <td>
                          <div className='flex items-center space-x-3'>
                                <FaEye
                                    size={22}
                                    onClick={() => onView(item.property.id)}
                                    className='cursor-pointer text-main-100'
                                />
                            </div>
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

        {/*  */}
    </section>
  )
}

export default AgentMatches
