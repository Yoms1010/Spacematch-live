import { SelectFieldProps } from '@/types'

function SelectField({title, handleChangeText, value, value1, value2, value3, otherStyles, title1, title2, title3, ...props}: SelectFieldProps) {

  return (
        <div className={`space-y-3 ${otherStyles}`}>
          <div className="text-16 text-gray-00  font-semibold mb-1">{title}</div>
    
            <div className="flex justify-center items-center w-full bg-black-100 border border-gray-300 rounded-xl">
                <select
                    value={value}
                    onChange={handleChangeText}
                    className="flex-1 text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl"
                    // {...props}
                >
                    <option value={value1}>{title1}</option>
                    <option value={value2}>{title2}</option>
                    <option value={value3}>{title3}</option>
                </select>
            </div>
        </div>
  )
}

export default SelectField
