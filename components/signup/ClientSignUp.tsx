import { countryCodes } from '@/constants';
import { clientOccupations } from '@/constants/main';
import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify';

function ClientSignUp({setShowForm, isClientAgreed, setIsClientAgreed, setShowLegalModal}: {setShowForm: any, isClientAgreed: boolean, setIsClientAgreed: React.Dispatch<React.SetStateAction<boolean>>, setShowLegalModal: React.Dispatch<React.SetStateAction<boolean|null>>}) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        code: "",
        mobile: "",
        occupation: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const terms_and_condition = useRef<any>(null)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const payLoad = {
            name: form.name,
            email: form.email,
            code: form.code,
            mobile: form.mobile,
            occupation: form.occupation,
            password: form.password,
            refund_policy: isClientAgreed && "Yes",
            terms_and_conditions: isClientAgreed && "Yes"
        }

        const res = await axios.post("/api/signup/client", payLoad)
            setIsLoading(false)
            const response = res;
            if (response.status === 200) {
                if(response.data.status === 201){
                    toast.success("Account successfully created. Redirecting...")
                    // router.push("/in/settings")
                }else if (response.data.errorData.status === 422) {
                    toast.error("That email has already been taken")
                }else{
                    toast.error("Kindly check your network connection")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg w-full max-w-3xl mt-20">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Client Sign Up</h2>
        <div className="space-y-4">
            <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-3'>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                 type="text" 
                 defaultValue={form.name}
                 onChange={(e) => setForm({...form, name: e.target.value})}
                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" 
                 placeholder="Jane Doe" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                 type="email" 
                 onChange={(e) => setForm({...form, email: e.target.value})}
                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" 
                 placeholder="you@example.com" 
                />
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <select onChange={(e) => setForm({...form, code: e.target.value})} className="p-2 border border-gray-300 rounded-l-md focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700 w-[30%]">
                    <option value="" className='text-gray-300'>Select Country</option>
                    {countryCodes.map((c, index) => (
                        <option key={`${c.code}-${index}`} value={c.code}>{c.code} {c.name}</option>
                    ))}
                </select>
                <input type="tel" onChange={(e) => setForm({...form, mobile: e.target.value})} className="flex-1 block w-full p-2 border border-gray-300 rounded-r-md focus:ring-main-100 focus:border-main-100" placeholder="e.g., 809 554 6085" />
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <select onChange={(e) => setForm({...form, occupation: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100 bg-gray-50 text-gray-700">
                <option value="">Select Occupation</option>
                {clientOccupations.map(type => (
                <option key={type} value={type}>{type}</option>
                ))}
            </select>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" onChange={(e) => setForm({...form, password: e.target.value})} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-main-100 focus:border-main-100" />
            </div>
            <div className="flex items-center space-x-2">
            <input 
                type="checkbox" 
                id="agreeTerms" 
                name="agreeTerms" 
                checked={isClientAgreed} 
                onChange={(e) => setIsClientAgreed(e.target.checked)}
                className="h-4 w-4 text-main-100 border-gray-300 rounded focus:ring-main-100"/>
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                This means that you agree with the <button type="button" onClick={() => setShowLegalModal(true)} className="text-main-100 hover:underline font-semibold">SpaceMatch terms and conditions</button>
            </label>
            </div>
        </div>
        <button 
            type="submit" 
            disabled={!isClientAgreed}
            className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 transition-all duration-200 ${isClientAgreed ? 'bg-main-100 hover:bg-main-100' : 'bg-gray-400 cursor-not-allowed'}`}
        >
            Sign Up as Client
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="#" className="font-medium text-main-100 hover:underline">Sign in here</a>
        </p>
        <button onClick={() => setShowForm(null)} className="w-full mt-3 py-2 text-main-100 font-semibold rounded-md hover:underline">
            Back
        </button>
    </form>
  )
}

export default ClientSignUp;