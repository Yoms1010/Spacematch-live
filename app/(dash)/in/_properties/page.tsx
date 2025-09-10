'use client'

import axiosClient from '@/axios-client'
import HeaderBox from '@/components/HeaderBox'
import Table from '@/components/Table'
import { useStateContext } from '@/context/ContextProvider'
import { DeveloperItemProps } from '@/types'
import { Eye, Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'

const Properties = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [property, setProperty] = useState<any>()
  const [propertyId, setPropertyId] = useState<any>()
  const { setNotification} = useStateContext()

  useEffect(() => {
    const getProperties = async () => {
      setIsLoading(true)
    await axiosClient.get("/property")
    .then((data) => {
      setIsLoading(false)
      setProperty(data.data)
    })
    .catch(err => console.error(err))
    }

    getProperties()
  }, []);
  
  
    function onEdit(id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ReactPortal | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined> | null | undefined): void {
      return router.push(`/in/properties/${id}`)
    }
  
    async function onDelete(id: any){
      if (typeof window != "undefined" && !window.confirm("Clicking ok means you want ot delete this property, and that action is not reversable.")) return;

       setPropertyId(id)
       setLoading(true)
       await axiosClient.delete(`/property/${id}`)
        .then((data) => {
          setLoading(false)
          setProperty(data.data)
          setNotification("Property deleted successfully")
        })
        .catch(err => console.error(err))
    }

    if (!property) {
      return (
            <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
              <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
            </div>
          )
    }

  return (
    <Suspense
      fallback={<div className="h-screen flex justify-center items-center text-30 font-bold w-full">
      <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-spin shadow-sm rounded-full"/>
      </div>}
    >
      <div className='container mb-3 p-4'>
        <HeaderBox
          title='Properties Table'
          subtext='Properties Details and management'
        />
        <div className='tables mt-5'>
            {
              isLoading
              ?
              <div className='flex justify-center items-center w-full h-[400px] bg-white'> 
                <Loader className='animate-spin'/>
              </div>
              :
              <Table
                header={'Properties Table'}  
                title1='Title'
                title2='LGA'
                title3='State'
                title4='Uploaded Date'
                title5='Images'
                title6='Status'
                title7='Action'
                handleEdit={onEdit}
                handleDelete={onDelete}
              >
            <>
              {
                property ? property.map((item: DeveloperItemProps, i: any) => (
                    <tr key={i} className='font-normal text-14 text-gray-500 text-left'>
                        <th>{i += 1}</th>
                        <th>{item.title}</th>
                        <th>{item.lga}</th>
                        <th>{item.state}</th>
                        <th className='text-left'>{item.created_at && item.created_at.split("T")[0]}</th>
                        <th>
                          <Link
                            href={`/in/properties/images/${item.id}`}
                            className='flex justify-center items-center space-x-1 text-blue-600 hover:text-blue-400'
                          >
                            <Eye/><p>View</p>
                          </Link>
                        </th>
                        <th>{item.bought === "No" ? <div className="text-green-500">Available</div> : <div className="text-red-500">Sold</div>}</th>
                        <td className='flex items-center space-x-3 py-3'>
                            <FaEdit
                                size={22}
                                onClick={() => onEdit(item.id)}
                                className='cursor-pointer'
                            />
                            {
                              item.id == propertyId && loading
                              ?
                              <Loader className='animate-spin'/>
                              :
                              <FaTrash
                                size={22}
                                onClick={() => onDelete(item.id)}
                                className='text-red-500 cursor-pointer'
                              />
                            }
                        </td>
                    </tr>
                ))
                :
                ""
              }
            </>
            </Table>
            }
        </div>
      </div>
    </Suspense>
  )
}

export default Properties