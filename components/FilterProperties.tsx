import { nigeria } from '@/constants';
import { FilterPropertiesProps } from '@/types';
import React from 'react'
import { FaSearch } from 'react-icons/fa';

const FilterProperties = ({title, handleRangeChange, handleSizeChange, handleLocationChange, value, min, max, minPrice, maxPrice, price}: FilterPropertiesProps) => {
  return (
    <div className='container-fluid mt-2'>
      <div className='filter-field'>

        <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5 lg:space-x-3'>

          <div className='col-span-2 flex flex-col'>
              <div className='font-semibold'>{title}</div>
              <div className='flex items-center space-x-3 w-full'>
                  <div className='min-price '>{minPrice}</div>
                  <div className='range-bar w-full'>
                      <input
                          min={min}
                          max={max}
                          type="range"
                          value={value}
                          onChange={handleRangeChange}
                          className={`flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl`}
                      />
                  </div>
                  <div className='max-price'>{maxPrice}</div>
              </div>
              <div className='w-full flex justify-center items-center mt-3'>
                  <div className='border-2 border-main-100 px-4 py-2 font-semibold'>{price}</div>
              </div>
          </div>

          <div className='w-full  px-4'>
            <h1 className='font-semibold text-16 mb-2'>Filter by property size</h1>
            <div className='flex justify-center items-center w-full rounded bg-white/90 px-5 border'>
                <select
                  onChange={handleSizeChange}
                  className='p-2 w-full outline-none'
                >
                  <option value="0, 50">0 - 50 SqM</option>
                  <option value="100">51 - 100 SqM</option>
                  <option value="150">101 - 150 SqM</option>
                  <option value="200">151 - 200 SqM</option>
                  <option value="250">201 - 250 SqM</option>
                  <option value="299">251 - 300 SqM</option>
                  <option value="300">300 Above SqM</option>
                </select>
            </div>
          </div>
        </div>


        <div className='flex flex-col gap-5 mt-2'>

          <div className='max-sm:px-5 w-full'>
            <h1 className='font-semibold text-16 mb-2'>Filter by property location</h1>
            <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-5 w-full rounded bg-white/90 px-5 border overflow-y-scroll h-[250px] py-5'>
                {
                  nigeria.map((item, i) => (
                    <div className='w-full'>
                      <div className='font-semibold'>{item.state}</div>
                      <select 
                       onChange={handleLocationChange}
                       className='border p-2 w-full'
                      >
                        {
                          item.lga.map((lg, i) => (
                            <option value={lg}>{lg}</option>
                          ))
                        }
                      </select>
                    </div>
                  ))
                }
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default FilterProperties;
