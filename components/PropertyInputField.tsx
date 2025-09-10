import { InputFieldProps } from '@/types'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

const PropertyInputField = ({title, handleChangeText, value, otherStyles,  placeholder, type, required, disabled, name}: InputFieldProps) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <div className="text-16 text-gray-600 font-semibold">{title}</div>
        <div className="flex justify-center items-center w-full bg-black-100 border border-gray-500 rounded-xl">
            <input
                value={value}
                placeholder={placeholder}
                onChange={handleChangeText}
                type={type === 'password' && !showPassword ? "password" : "text"}
                disabled={disabled}
                required={required}
                name={name}
                className={`flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl`}
                // {...props}
            />
            {
                title === 'Password' && (
                    <button 
                        className='px-2'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                            {!showPassword 
                                ? <FaEye className="w-4 h-4 text-gray-600"/> 
                                : <FaEyeSlash className="w-4 h-4 text-gray-600"/>}
                    </button>
                )
            }
        </div>
    </div>
  )
}

export default PropertyInputField