'use client'

import { useStateContext } from '@/context/ContextProvider';
import { redirect, useRouter } from 'next/navigation';
import React, { useState, useEffect, Key } from 'react';


// A reusable component for each section in the order summary
const SummarySectionCapsule = ({ title, icon, details, on_change }: {title: any, icon: any, details: any, on_change?: any}) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                {icon}
                <span>{title}</span>
            </h3>
            <button className="text-purple-600 hover:underline text-sm font-medium" onClick={() => redirect("/products")}>Change</button>
        </div>
        <ul className="text-gray-600 text-sm space-y-1">
            {/* {details.map((detail: any, index: Key) => ( */}
                <li><span className="font-semibold">{details.title}:</span> ₦{Number(details.vendorPrice + details.shipmentCost).toLocaleString()}</li>
        </ul>
    </div>
);

// A reusable component for each section in the order summary
const SummarySectionLand = ({ title, icon, details, on_change }: {title: any, icon: any, details: any, on_change?: any}) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                {icon}
                <span>{title}</span>
            </h3>
            <button className="text-purple-600 hover:underline text-sm font-medium" onClick={() => redirect("/property/land-selection")}>Change</button>
        </div>
        <ul className="text-gray-600 text-sm space-y-1">
            {/* {details.map((detail: any, index: Key) => ( */}
                <li><span className="font-semibold">{details.title}:</span> ₦{Number(details.price).toLocaleString()}</li>
        </ul>
    </div>
);

// A reusable component for each section in the order summary
const SummarySectionPaymentOption = ({ title, icon, details, on_change }: {title: any, icon: any, details: any, on_change?: any}) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                {icon}
                <span>{title}</span>
            </h3>
            <button className="text-purple-600 hover:underline text-sm font-medium" onClick={() => redirect("/property/solutions")}>Change</button>
        </div>
        <ul className="text-gray-600 text-sm space-y-1">
            {details.map((detail: any, index: Key) => (
                <li key={index}><span className="font-semibold">{detail.paymentMethod}:</span> ₦{Number(detail.capsuleCost+detail.vendorPrice + detail.shipmentCost).toLocaleString()}</li>
            ))}
        </ul>
    </div>
);

// The component for the entire order summary card
const OrderSummary = () => {
    // const homeDesignDetails = [
    //     { label: 'Capsule', value: '2 Bedroom' },
    //     { label: 'Cost', value: '$110,000' }
    // ];

    // const landSelectionDetails = [
    //     { label: 'Location', value: 'Residential Plot in Ikeja, Lagos' },
    //     { label: 'Land Size', value: '750 sqM' },
    //     { label: 'Land Cost', value: '$150,000' }
    // ];

    // const paymentPlanDetails = [
    //     { label: 'Method', value: 'Financing' },
    //     { label: 'Deposit', value: '20% Down Payment' },
    //     { label: 'Note', value: 'Total cost includes a dummy interest of $8,000.' }
    // ];

    const [property, setProperty] = useState<any>()
    const [solution, setSolution] = useState<any>(
        {
          solution: "",
          capsule: "",
          capsule_cost: 0,
          capsule_features: {} as any,
          selected_land: {} as any,
          selected_payment_method: ""
        }
      )

    useEffect(() => {
        const fetchPurchaseItem = async () => {
        // const propertyId = localStorage.getItem("selected_land_id")
        const selectedSolution = localStorage.getItem("selected_solution")
        const selectedCapsule = JSON.parse(localStorage.getItem("selected_capsule")!)
        const selectedCapsuleFeatures = JSON.parse(localStorage.getItem("selected_capsule_features")!)
        const selectedCapsuleCost = JSON.parse(localStorage.getItem("selected_capsule_cost")!)
        const selectedLand = JSON.parse(localStorage.getItem("selected_land")!)
        const selectedPaymentMethod = localStorage.getItem("selected_payment_method")
    
          setSolution({...solution,
              solution: selectedSolution, 
              capsule: selectedCapsule, 
              capsule_cost: selectedCapsuleCost, 
              capsule_features: selectedCapsuleFeatures,
              selected_land: selectedLand,
              selected_payment_method: selectedPaymentMethod
            })
          setProperty(property)

        }
        fetchPurchaseItem()
      }, [])


    return (
        <section className="bg-white rounded-xl shadow-lg p-6 h-fit w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order Summary</h2>
            <SummarySectionCapsule
                title="Home Design"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l-7-7-7 7m7 7v7a1 1 0 01-1 1h-3m3 0a1 1 0 00-1-1v-7a1 1 0 011-1h-1a1 1 0 00-1 1v7a1 1 0 01-1 1H9m4-7a1 1 0 011-1h1a1 1 0 011 1v7a1 1 0 01-1 1h-1a1 1 0 01-1-1v-7z" />
                </svg>}
                details={solution.capsule}
            />
            <SummarySectionLand
                title="Land Selection"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>}
                details={solution.selected_land}
            />
            {/* The last section doesn't need a bottom border */}
            <div className="pb-4">
                 <SummarySectionPaymentOption
                    title="Payment Plan"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h10m-2-5a2 2 0 11-4 0a2 2 0 014 0z" />
                    </svg>}
                    details={[{"paymentMethod": solution.selected_payment_method, "capsuleCost": solution.capsule_cost, "vendorPrice": solution.capsule.vendorPrice, "shipmentCost": solution.capsule.shipmentCost}]}
                />
            </div>
        </section>
    );
};

// The component for the account creation form
const AccountCreation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isFormValid, setIsFormValid] = useState<boolean | string>(false);
    const [passwordError, setPasswordError] = useState('');
    const router = useRouter()
    

    useEffect(() => {
        const { name, email, password, confirmPassword } = formData;
        const allInputsFilled = name && email && password && confirmPassword;
        const passwordsMatch = password === confirmPassword;

        if (allInputsFilled && !passwordsMatch) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }

        setIsFormValid(allInputsFilled && passwordsMatch);
    }, [formData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePlaceOrder = () => {
        if (isFormValid) {
            // Replicating original alert. In a real app, this would trigger a payment flow.
            alert('Thank you for your order! You will now be redirected to the payment page.');

        }
    };

    return (
        <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </div>
                <div className="text-center mt-6">
                    <a href="#" className="text-sm text-purple-600 hover:underline">Already have an account? Log in</a>
                </div>
            </form>

            <div className="mt-8 text-center">
                <button
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid}
                    className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-md shadow-lg transition-colors duration-300 enabled:hover:bg-purple-700 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Place Order & Pay Deposit
                </button>
            </div>
        </section>
    );
};


// The main App component that lays out the page
export default function ReviewOrderPage() {
    const {user, token} = useStateContext()

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-32 font-[Inter]">
            {/* <header className="bg-white shadow-sm rounded-xl p-6 mb-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800">Review Order & Create Account</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Please review your order details before creating your account and placing your order.
                    </p>
                </div>
            </header> */}

            <main className="max-w-6xl mx-auto">
                <div className={`grid ${!token ? "grid-cols-2 max-sm:grid-cols-1" : "grid-cols-1"} gap-8`}>
                    <OrderSummary />
                    {!token && <AccountCreation />}
                </div>
            </main>
        </div>
    );
}
