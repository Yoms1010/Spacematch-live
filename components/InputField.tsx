import { InputFieldProps, InputFieldsProps } from '@/types'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

const InputField = ({title, handleChangeText, value, otherStyles,  placeholder, type, required, disabled}: InputFieldsProps) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <div className="text-14 text-gray-600 font-semibold ">{title}</div>
        <div className="flex justify-center items-center w-full bg-black-100 border border-gray-300 rounded-xl">
            <input
                defaultValue={value}
                placeholder={placeholder}
                onChange={handleChangeText}
                type={type === 'password' && !showPassword ? "password" : "text"}
                disabled={disabled}
                required={required}
                className={`flex-1 text-gray-500 font-psemibold text-base outline-none w-full rounded-xl p-2`}
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

export default InputField