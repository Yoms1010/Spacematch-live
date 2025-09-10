'use client'

import React, { Key, useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import axiosClient from '@/axios-client';
import { FaTrash } from 'react-icons/fa6';
import Image from 'next/image';

DataTable.use(DT);
function Agents4Superadmin() {

  const [agents, setAgents] = useState<any>()

  useEffect(() => {
      const fetchAgents = async () => {
        await axiosClient.get("/agents")
        .then((data) => {
          setAgents(data.data)
          console.log(data);
        })
        .catch((err) => console.log(err))
      }

      fetchAgents()
    }, [])

  function onDelete(id: any): void {
    throw new Error('Function not implemented.');
  }

  if (!agents) {
    return (
        <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
          <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
        </div>
      )
  }

  return (
    <div className='px-5 mb-5'>
      <div className='bg-white p-3'>
      <div className='p-3 bg-white'>
            <DataTable className="display">
                <thead >
                <tr className='justify-start'>
                        <th scope='row'>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Location</th>
                        <th>Agreement</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     {
                          agents ? agents.map((item: any, i: Key) => (
                              <tr className='text-left' key={i}>
                                  <td>{item.id}</td>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.mobile}</td>
                                  <td><div className='overflow-y-scroll h-[50px]'>{`${item.city}, ${item.lga}, ${item.state}. ${item.country}`}</div></td>
                                  <td>{item.is_signed == "Yes" ? <div className='text-main-100'>Signed</div> : <div className='text-red-500'>Not Signed</div>}</td>
                                  <td>
                                      <FaTrash
                                          size={22}
                                          onClick={() => onDelete(item.id)}
                                          className='text-red-500 cursor-pointer'
                                      />
                                  </td>
                              </tr>
                          ))
                          :
                          ""
                      }
                </tbody>
            </DataTable>
        </div>
      </div>
    </div>
  )
}

export default Agents4Superadmin
