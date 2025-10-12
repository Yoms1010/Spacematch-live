'use client'


import SuperDataTable from '@/components/cardsui/SuperDataTable';
import { Column, VendorProps } from '@/types';
import { Loader, Trash2Icon, VerifiedIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Key } from 'react'
import { GrDocumentVerified } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";

function Vendors({vendors}: {vendors: VendorProps | any}) {

    const router = useRouter()

  function onDelete(id: number): void {
    if (!window.confirm("Are you sure? This action cannot be reversed once done!")) return;
  }
  
  function onVerify(id: number): void {
     router.push(`/in/vendors/verify-document/${id}`)
  }

  let vendorsData: VendorProps[] | any = [];
  vendorsData = vendors.map((item: VendorProps, i: number) => (
    {
      id: i+1, 
      name: item.name, 
      email: item.email, 
      code: item.code,
      mobile: item.mobile[0] == 0 ? item.code+ String(item.mobile).substring(0) : item.code+item.mobile,
      developer_type: item.developer_type,
      is_document_verified: item.is_document_verified,
      created_at: item.created_at.split(".")[0]
    }
  ))


  const columns: Column<VendorProps>[] = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Email', accessor: 'email', sortable: true },
    { header: 'Mobile Number', accessor: 'mobile', sortable: true },
    { header: 'Vendor Type', accessor: 'developer_type', sortable: false },
    { header: 'Document Verified', accessor: 'is_document_verified', sortable: false },
    { header: 'Date', accessor: 'created_at', sortable: false },
    { header: 'Actions', accessor: 'created_at', sortable: false },
  ];

    

  return (
    <div>
      {vendors ? 
      <SuperDataTable data={vendorsData} columns={columns} pageSize={10} title='Subscription Data Table'>
        {
            vendorsData.map((item: VendorProps, i: Key) => (
                <tr key={i}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700`}>{item.id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700`}>{item.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700`}>{item.email}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700`}>{item.mobile}</td>
                    <td className={`px-6 py-4 text-sm text-gray-700 text-ellipsis line-clamp-1`}>{item.developer_type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700`}>
                        {
                            item.is_document_verified === "No"
                            ?
                            <span className='flex justify-center items-center text-red-600'><ImCancelCircle/>&nbsp;<p>No</p></span>
                            :
                            <span><GrDocumentVerified className='text-green-600'/></span>
                        }
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700`}>{item.created_at}</td>
                    <tr className={`flex justify-center items-center px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-full`}>
                        <div className='flex justify-between items-center w-full h-full'>
                            <VerifiedIcon
                             onClick={() => onVerify(item.id)}
                             className='text-green-600 cursor-pointer'
                            />
                            {/* <Trash2Icon 
                             onClick={() => onDelete(item.id)}
                             className='text-red-500'/> */}
                        </div>
                    </tr>
                </tr>
            ))
        }
      </SuperDataTable>
      :
        <div className='flex justify-center items-center w-full'>
            <Loader className='animate-spin'/><p>Loading...</p>
        </div>
    }
    </div>
  )
}

export default Vendors
