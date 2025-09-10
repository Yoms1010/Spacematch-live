import { countryCodes } from '@/constants'
import { vendorTypes } from '@/constants/main'
import React, { useRef, useState } from 'react'

function VendorSignup() {

    const [form, setForm] = useState({
            name: "",
            email: "",
            password: "",
            business_name: "",
            mobile: "",
            code: "",
            developer_type: "",
            terms_and_conditions: "",
            refund_policy: ""
          })
        const codeRef = useRef<any>(null)
        const refundPolicyRef = useRef<any>(null)
        const termsAndConditionsRef = useRef<any>(null)
        const [showLegalModal, setShowLegalModal] = useState<boolean|null>(null);

  return (
    <form className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl mt-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Vendor Sign Up</h2>
        <div className="space-y-4">
            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-3'>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" onChange={(e: any) => ({...form, name: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="John Doe" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" onChange={(e: any) => ({...form, email: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="you@example.com" />
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input type="text" onChange={(e: any) => ({...form, business_name: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="Your Company Inc." />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <select onChange={(e: any) => ({...form, code: e.target.value})} className="p-2 border border-gray-300 rounded-l-md focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700 w-[30%]">
                {countryCodes.map((c, index) => (
                    <option key={`${c.code}-${index}`} value={c.code}>{c.code} {c.name}</option>
                ))}
                </select>
                <input type="tel" onChange={(e: any) => ({...form, mobile: e.target.value})} className="flex-1 block w-full p-2 border border-gray-300 rounded-r-md focus:ring-main-100 focus:border-main-100" placeholder="e.g., 809 554 6085" />
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Vendor Type</label>
            <select onChange={(e: any) => ({...form, vendor_type: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700">
                <option value="">Select Option</option>
                {vendorTypes.map(type => (
                <option key={type} value={type}>{type}</option>
                ))}
            </select>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" onChange={(e: any) => ({...form, password: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" />
            </div>
            <div className="flex items-center space-x-2">
            <input 
                type="checkbox" 
                id="agreeTerms" 
                name="agreeTerms" 
                ref={termsAndConditionsRef}
                className="h-4 w-4 text-main-100 border-gray-300 rounded focus:ring-main-100"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                This means that you agree with the <button type="button" onClick={() => setShowLegalModal(true)} className="text-main-100 hover:underline font-semibold">SpaceMatch terms and conditions</button>
            </label>
            </div>
        </div>
        <button 
            type="submit" 
            disabled={!isVendorAgreed}
            className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 ${isVendorAgreed ? 'bg-main-100 hover:bg-main-100' : 'bg-gray-400 cursor-not-allowed'}`}
        >
            Sign Up as Vendor
        </button>
        <button onClick={() => setShowForm(null)} className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline">
            Back
        </button>
    </form>
  )
}

export default VendorSignup
