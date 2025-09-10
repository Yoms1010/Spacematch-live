import { PropertiesProps } from '@/types'
import React from 'react'
import Image from 'next/image';
import { TbMeterSquare } from "react-icons/tb";
import { LuLandPlot } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { BsPinMapFill } from "react-icons/bs";

const AllProperties = ({title, location, lga, imgSource, alt, cost, beds, squaremeters, total_cost, children}: PropertiesProps) => {

    
  return (
    <div className=''>
        <div className='shadow-sm shadow-gray-200 rounded-br-xl rounded-bl-xl'>
            {
                imgSource
                ?
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${imgSource}`}
                    width={400}
                    height={160}
                    alt={alt}
                    className='h-[200px] w-full'
                    // unoptimized
                />
                :
                <Image
                    src={`/properties/no-image.svg`}
                    width={400}
                    height={160}
                    alt={alt}
                    className='h-[200px] w-full'
                    // unoptimized
                />
            }

            <div className='flex flex-col justify-center p-3 gap-2'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='font-semibold text-sm'>{title}</div>
                    <p>₦{total_cost}</p>
                </div>
                <div className='flex flex-row items-center space-x-1 text-main-100'><FaLocationDot/> <p>{location}</p></div>
                <div className='flex flex-row items-center justify-between text-sm text-gray-500'>
                    <div className='flex flex-row justify-center items-center space-x-1'><BsPinMapFill/> <p>{lga}</p></div>
                    <div className='flex flex-row justify-center items-center'>₦{cost}/<TbMeterSquare/></div>
                    {/* <div className='flex flex-row justify-center items-center space-x-1'><IoBed/> <p>{beds}</p></div> */}
                    <div className='flex flex-row justify-center items-center space-x-1'><LuLandPlot/> <p className='flex flex-row justify-center items-center'>{squaremeters}<TbMeterSquare/></p> </div>
                </div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default AllProperties