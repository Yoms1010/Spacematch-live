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

  // Define your plans. The 'amount' MUST be in kobo (NGN 5000 = 500000 kobo)
  const plans = {
    monthly: {
      id: "SPCMTH-01",
      amount: 500000, // ₦5,000.00
      name: "Monthly Subscription"
    },
    annual: {
      id: "SPCYRL-01",
      amount: 5000000, // ₦50,000.00
      name: "Annual Subscription"
    }
  };

  const handleSubscribe = async (plan) => {
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

    } catch (err) {
      setError(err.response ? err.response.data.error : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Our Pricing</title>
      </Head>

      <h1>Choose Your Plan</h1>
      
      {/* Monthly Plan Card */}
      <div>
        <h2>Monthly Plan</h2>
        <p>₦5,000 / month</p>
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
        <p>₦50,000 / year</p>
        <button 
          onClick={() => handleSubscribe(plans.annual)} 
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Subscribe Now"}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}