'use client'

import HeaderBox from '@/components/HeaderBox'
import React, { Key, Suspense, useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import axiosClient from '@/axios-client';
import { FaTrash } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';


DataTable.use(DT);

function page() {

  const [vendors, setVendors] = useState<any>()

  useEffect(() => {
    axiosClient.get("/developers")
    .then((data) => {
      setVendors(data.data)
      console.log(data);
    })
    .catch((err) => console.log(err))
  }, [])


  function onEdit(id: number, i: React.Key): void {
    throw new Error('Function not implemented.');
  }

  function onDelete(id: number): void {
    if (!window.confirm("Are you sure? This action cannot be reversed once done!")) return;
  }


  return (
    <Suspense
      fallback={<div className="h-screen flex justify-center items-center text-30 font-bold w-full">
      <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-spin shadow-sm rounded-full"/>
      </div>}
    >
      <div className="m-5">
        <HeaderBox
              title='Vendors Table'
              subtext='Details of all registered Vendors'
          />

          <div className='p-3 bg-white overflow-x-scroll max-w-[1130px]'>
            <DataTable className="display">
                <thead >
                    <tr className='justify-start'>
                        <th scope='row'>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className='text-left'>Mobile No</th>
                        <th>Developer type</th>
                        <th>Location</th>
                        <th>Agreement</th>
                        <th>Subscription</th>
                        <th>Properties Uploaded</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-left'>
                    {
                      vendors ? vendors.map((item: {
                        properties: any;id: number, name: string, email: string, mobile:string, developer_type:string, location:string, is_signed: string, subscription:string
  }, i: Key) => (
                        <tr className='text-left'>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td><div className='truncate w-[100px]'>{item.email}</div></td>
                          <td>{item.mobile}</td> 
                          <td>{item.developer_type}</td>
                          <td><div className='overflow-y-scroll h-[50px]'>{item.location}</div></td>
                          <td>{item.is_signed == "Yes" ? <div className='text-main-100'>Signed</div> : <div className='text-red-600'>Not Signed</div>}</td>
                          <td>{item.subscription ? item.subscription : <div className='text-red-500'>No Subscription</div>}</td>
                          <td><div className='text-main-100 flex justify-center w-full'>{item.properties && item.properties.length > 0 ? <Link href={`/in/vendors/properties/${item.id}`} className='text-main-100'>{item.properties.length} uploaded</Link> : <div className='text-red-500'>None</div>}</div></td>
                          <td>
                            <div className='flex items-center space-x-3'>
                                {/* <FaEdit
                                    size={22}
                                    onClick={() => onEdit(item.id, i)}
                                    className='cursor-pointer '
                                /> */}
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
      </div>
    </Suspense>
  )
}

export default page
