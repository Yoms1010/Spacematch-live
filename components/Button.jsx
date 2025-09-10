import { Loader } from 'lucide-react'
import React from 'react'

function Button({onClick, type, disabled, loading, title}) {
  return (
    <div>
      <button 
          type={type} 
          onClick={onClick}
          disabled={disabled}
          className='btn bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold'
      >
          {
              {loading} 
              ?
              <Loader/>
              :
              {title}
          }
      </button>
    </div>
  )
}

export default Button