'use client'

import { HeaderBoxProps } from '@/types'
import React, { useState } from 'react'

const HeaderBox = ({type = "title", title, subtext, user} : HeaderBoxProps ) => {

  const date = new Date()

  return (
    <div className="header-box mt-[10px] mb-[10px] bg-white p-5 rounded-tr-xl rounded-bl-xl">
      <div>
        <h1 className="header-box-title flex items-center space-x-2">
          <span>{title}</span>
          {type === 'greeting' && (
            <span className="text-bankGradient">
              {user}
            </span>
          )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
      </div>
      <div className='time'>
        {/* {date.toLocaleDateString()} */}
      </div>
    </div>
  )
}

export default HeaderBox
