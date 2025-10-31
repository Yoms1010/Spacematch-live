// pages/pricing.jsx
'use client'

import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

// We'll assume the user's email is available (e.g., from auth)
// For this example, we'll hard-code it.
const userEmail = "customer@example.com"; 

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- UPDATED VALUES HERE ---
  const plans = {
    monthly: {
      id: "SPCMTH-01",
      amount: 495000, // ₦4,950.00 in kobo
      name: "Monthly Subscription"
    },
    annual: {
      id: "SPCYRL-01",
      amount: 4995000, // ₦49,950.00 in kobo
      name: "Annual Subscription"
    }
  };
  // --- END OF UPDATES ---

  const handleSubscribe = async (plan: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Send the plan details to our *own* backend API route
      const { data } = await axios.post('/api/squadco/initialize', {
        email: userEmail,
        amount: plan.amount,
        planName: plan.name,
      });

      // 2. The API route returns a SquadCo checkout URL
      const { checkout_url } = data;

      // 3. Redirect the user to SquadCo's secure checkout
      if (checkout_url) {
        window.location.href = checkout_url;
      }

    } catch (err: any) {
      setError(err.response ? err.response.data.error : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className='pt-28'>
      <Head>
        <title>Our Pricing</title>
      </Head>

      <h1>Choose Your Plan</h1>
      
      {/* --- UPDATED DISPLAY TEXT HERE --- */}
      {/* Monthly Plan Card */}
      <div>
        <h2>Monthly Plan</h2>
        <p>₦4,950 / month</p>
        <button 
          onClick={() => handleSubscribe(plans.monthly)} 
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Subscribe Now"}
        </button>
      </div>

      {/* Annual Plan Card */}
      <div>
        <h2>Annual Plan</h2>
        <p>₦49,950 / year</p>
        <button 
          onClick={() => handleSubscribe(plans.annual)} 
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Subscribe Now"}
        </button>
      </div>
      {/* --- END OF UPDATES --- */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}