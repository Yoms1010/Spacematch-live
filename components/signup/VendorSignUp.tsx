import { countryCodes } from '@/constants';
import { vendorTypes } from '@/constants/main';
import axios from 'axios';
import { Loader } from 'lucide-react'
import React, { useRef, useState } from 'react'

function VendorSignUp() {

    const [loading, setLoading] = useState(false)
    const [isVendorAgreed, setIsVendorAgreed] = useState(false);
    const [showForm, setShowForm] = useState<string| null>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        business_name: "",
        mobile: "",
        vendor_type: "",
        terms_and_conditions: "",
        refund_policy: ""
      })
    const codeRef = useRef<any>(null)

     const handleSignUp = async (e: any) => {
      e.preventDefault();
        const payLoad = {
          name: form.name,
          email: form.email,
          code: codeRef.current.value,
          mobile: form.mobile,
          password: form.password,
          business_name: form.business_name,
          developer_type: form.vendor_type,
          terms_and_conditions: isVendorAgreed && "Yes",
          refund_policy: isVendorAgreed && "Yes"
        }

        setLoading(true);
        const res = await axios.post("/api/signup", payLoad)

        setLoading(false);
        console.log(res);
    }

  return (
    <form onSubmit={handleSignUp} className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl mt-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Vendor Sign Up</h2>
        <div className="space-y-4">
            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-3'>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                type="text" 
                name='name'
                onChange={(e: any) => setForm({...form, name: e.target.value})} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" placeholder="John Doe" 
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                type="email" 
                name="email"
                onChange={(e: any) => setForm({...form, email: e.target.value})} 
                placeholder="you@example.com" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100"
                required
                />
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
            type="text" 
            name='business_name'
            onChange={(e: any) => setForm({...form, business_name: e.target.value})} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" 
            placeholder="Your Company Inc." 
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <select ref={codeRef} className="p-2 border border-gray-300 rounded-l-md focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700 w-[30%]" required>
                {countryCodes.map((c, index) => (
                    <option key={`${c.code}-${index}`} value={c.code}>{c.code} {c.name}</option>
                ))}
                </select>
                <input type="tel" onChange={(e: any) => setForm({...form, mobile: e.target.value})} className="flex-1 block w-full p-2 border border-gray-300 rounded-r-md focus:ring-main-100 focus:border-main-100" placeholder="e.g., 809 554 6085" />
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Vendor Type</label>
            <select onChange={(e: any) => setForm({...form, vendor_type: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700" required>
                <option value="">Select Option</option>
                {vendorTypes.map(type => (
                <option key={type} value={type}>{type}</option>
                ))}
            </select>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" onChange={(e: any) => setForm({...form, password: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" required/>
            </div>
            <div className="flex items-center space-x-2">
            <input 
                type="checkbox" 
                id="agreeTerms" 
                name="agreeTerms" 
                checked={isVendorAgreed}
                onChange={(e) => setIsVendorAgreed(e.target.checked)}
                className="h-4 w-4 text-main-100 border-gray-300 rounded focus:ring-main-100"
                required
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                {/* This means that you agree with the <button type="button" onClick={() => setShowLegalModal(true)} className="text-main-100 hover:underline font-semibold">SpaceMatch terms and conditions</button> */}
            </label>
            </div>
        </div>
        <button 
            type="submit" 
            disabled={!isVendorAgreed}
            className={`flex justify-center items-center w-full mt-6 py-3 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 ${isVendorAgreed ? 'bg-main-100 hover:bg-main-100' : 'bg-gray-400 cursor-not-allowed'}`}
        >
            {
            loading
            ?
            <Loader className='animate-spin'/>
            :
            "Sign Up as Vendor"
            }
        </button>
        <button onClick={() => setShowForm(null)} className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline">
            Back
        </button>
    </form>
  )
}

export default VendorSignUp
