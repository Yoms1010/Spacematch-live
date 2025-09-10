'use client'
import { getPropertyById } from '@/lib/actions/property.action';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const FullPaymentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
);
const InstallmentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-2V2h-2v2h-2V2H9v2H7V2H5v2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H3V10h18v10z"/></svg>
);
const FinancingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);

const ChooseFinancingPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('full-payment');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [property, setProperty] = useState<any>()
  const [solution, setSolution] = useState<any>(
    {
      solution: "",
      capsule: "",
      capsule_cost: 0,
      capsule_features: {} as any,
    }
  )
  const baseCosts = {
    home: Number(solution.capsule_cost),
    land: Number(property?.total_cost),
    delivery: 220000,
  };

  let newTotal = baseCosts.home + baseCosts.land + baseCosts.delivery;

  const dummyInterest = 8000;
  useEffect(() => {
    let newTotal = baseCosts.home + baseCosts.land + baseCosts.delivery;
    if (selectedPaymentMethod === 'financing') {
      newTotal += dummyInterest;
    }
    setTotalCost(newTotal);
  }, [selectedPaymentMethod]);

  useEffect(() => {
    const fetchPurchaseItem = async () => {
      const propertyId = localStorage.getItem("selected_land_id")
      const selectedSolution = localStorage.getItem("selected_solution")
      const selectedCapsule = JSON.parse(localStorage.getItem("selected_capsule")!)
      const selectedCapsuleFeatures = JSON.parse(localStorage.getItem("selected_capsule_features")!)
      const selectedCapsuleCost = JSON.parse(localStorage.getItem("selected_capsule_cost")!)

      const property = await getPropertyById(propertyId!)
      setSolution({...solution,
          solution: selectedSolution, 
          capsule: selectedCapsule, 
          capsule_cost: selectedCapsuleCost, 
          capsule_features: selectedCapsuleFeatures
        })
      setProperty(property)

      let newTotal = baseCosts.home + baseCosts.land + baseCosts.delivery;
      setTotalCost(newTotal);
    }
    fetchPurchaseItem()
  }, [])

  // console.log(property);
  

  const milestoneSchedule = () => {
    switch (selectedPaymentMethod) {
      case 'full-payment':
        return [{
          title: 'Full Payment (100%):',
          description: 'Due at order confirmation.',
          icon: <FullPaymentIcon />,
        }, ];
      case 'installments':
        return [{
          title: 'Deposit (10%):',
          description: 'Due at order confirmation.',
          icon: <FullPaymentIcon />,
        }, {
          title: 'Manufacturing Start (40%):',
          description: "Due when manufacturing begins at the vendor's site.",
          icon: <InstallmentsIcon />,
        }, {
          title: 'Delivery & Setup (40%):',
          description: 'Due upon arrival and commencement of setup at the land location.',
          icon: <FullPaymentIcon />,
        }, {
          title: 'Final Handover (10%):',
          description: 'Due upon final inspection and client handover.',
          icon: <FullPaymentIcon />,
        }, ];
      case 'financing':
        return [{
          title: 'Down Payment (20%):',
          description: 'Due at order confirmation.',
          icon: <FullPaymentIcon />,
        }, {
          title: 'Financed Amount (80% + Interest):',
          description: 'Paid to us by a financing partner. Client pays back the partner based on their agreement.',
          icon: <FinancingIcon />,
        }, ];
      default:
        return [];
    }
  };


  const handleConfirmOrder = () => {
    alert('Your order is being reviewed for confirmation.');

    localStorage.setItem("selected_payment_method", selectedPaymentMethod)
    redirect("/products/review-order")
  };

  
  return (
    <div className="bg-gray-100 min-h-screen px-6 font-inter py-24">
      <header className="bg-white shadow-sm rounded-xl p-6 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Choose Financing & Payment Plan</h1>
          <p className="mt-2 text-lg text-gray-600">
            Select your preferred payment method and review the payment schedule.
          </p>
        </div>
      </header>
      <main className="container mx-auto">
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['full-payment', 'installments', 'financing'].map((method) => (
              <div
                key={method}
                className={`payment-option bg-gray-50 rounded-lg p-4 cursor-pointer ring-2 ring-transparent transition-all duration-200 ${selectedPaymentMethod === method ? 'active ring-purple-500 bg-purple-50' : ''}`}
                onClick={() => setSelectedPaymentMethod(method)}
              >
                <input
                  type="radio"
                  name="payment-method"
                  id={method}
                  value={method}
                  className="hidden"
                  checked={selectedPaymentMethod === method}
                  onChange={() => setSelectedPaymentMethod(method)}
                />
                <label htmlFor={method} className="block">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 bg-purple-100 rounded-full text-purple-600">
                      {method === 'full-payment' && <FullPaymentIcon />}
                      {method === 'installments' && <InstallmentsIcon />}
                      {method === 'financing' && <FinancingIcon />}
                    </span>
                    <div>
                      <span className="block font-bold text-lg text-gray-800">
                        {method === 'full-payment' && 'Full Payment'}
                        {method === 'installments' && 'Installments'}
                        {method === 'financing' && 'Financing'}
                      </span>
                      <span className="block text-sm text-gray-600">
                        {method === 'full-payment' && 'Pay the entire amount upfront.'}
                        {method === 'installments' && 'Pay in structured milestones.'}
                        {method === 'financing' && 'Partner with a financial institution.'}
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>{solution.solution} ({solution.capsule.title})</span>
              <span className="font-semibold">₦{baseCosts.home.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Land Lease (per annum)</span>
              <span className="font-semibold">₦{baseCosts.land.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery & Setup</span>
              <span className="font-semibold">₦{baseCosts.delivery.toLocaleString()}</span>
            </div>
            {selectedPaymentMethod === 'financing' && (
              <div className="flex justify-between">
                <span>Interest (Dummy Rate)</span>
                <span className="font-semibold text-red-500">₦{dummyInterest.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-purple-600">
              <span>Total Estimated Cost</span>
              <span>₦{totalCost ? totalCost.toLocaleString() : newTotal.toLocaleString()}</span>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Milestone Schedule</h2>
          <ol className="space-y-4">
            {milestoneSchedule().map((milestone, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-lg flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white font-bold rounded-full text-lg flex-shrink-0">
                  {milestone.icon}
                </div>
                <div>
                  <span className="font-bold">{milestone.title}</span>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions and Return Policy</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms-agree"
              className="h-5 w-5 text-purple-600 rounded"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
            />
            <label htmlFor="terms-agree" className="ml-2 text-sm text-gray-800 font-medium">
              I have read, understood, and agree to the{' '}
              <button
                className="text-purple-600 font-bold hover:underline focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTerms(!showTerms);
                }}
              >
                Terms & Conditions and Return Policy
              </button>
              .
            </label>
          </div>
          <div className={`prose max-w-none text-sm text-gray-600 space-y-4 ${showTerms ? '' : 'hidden'}`}>
            <h3 className="font-bold text-lg text-gray-800">1. Cancellation and Refunds</h3>
            <p>
              All sales are final. Due to the bespoke nature of our solutions and the associated upfront costs for manufacturing and procurement, no refunds will be issued once the initial deposit has been paid. In the event a client wishes to cancel their order, they are responsible for finding a third party to take over the purchase. We will facilitate a transfer of the ownership title and all associated contracts to the new party.
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-white p-8 mt-12 shadow-sm text-center">
        <button
          className={`font-bold py-4 px-8 rounded-md transition-colors duration-300 ${selectedPaymentMethod ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
          disabled={!termsAgreed}
          onClick={handleConfirmOrder}
        >
          Review & Confirm Order
        </button>
      </footer>
    </div>
  );
};
export default ChooseFinancingPage;