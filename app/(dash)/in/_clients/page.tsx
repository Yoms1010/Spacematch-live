'use client'

import HeaderBox from '@/components/HeaderBox'
import React, { Key, useEffect, useState } from 'react'
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net';
import axiosClient from '@/axios-client';
import { FaTrash } from 'react-icons/fa6';


DataTable.use(DT);
function page() {

    const [client, setclients] = useState<any>()

    useEffect(() => {
        const getBuyers = async () => {
            await axiosClient.get("/buyers")
            .then((data) => {
                setclients(data.data)
                console.log(data);
            })
            .catch((err) => console.log(err))
        }

        getBuyers()
    }, [])


    function onDelete(id: any): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className='m-5'>
        <HeaderBox
            title='Clients Table'
            subtext='Details of all registered Vendors'
        />

        <div className='p-3 bg-white'>
            <DataTable className="display">
                <thead >
                    <tr className='justify-start'>
                        <th scope='row'>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Ownership Type</th>
                        <th>Location</th>
                        <th>Subscription</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-left'>
                    {
                        client ? client.map((item: any, i: Key) => (
                            <tr className='text-left' key={i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.ownership_type}</td>
                                <td><div className='overflow-y-scroll h-[50px]'>{`${item.city}, ${item.lga}, ${item.state}. ${item.country}`}</div></td>
                                <td>{item.subscription ? item.subscription : <div className='text-red-500'>No Subscription</div>}</td>
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
  )
}

export default page
