import React, { useState, useEffect } from 'react';

// This is the main component for the Next.js page, orchestrating the entire vendor application flow.
// In a real-world Next.js application, each of these "views" would likely be a separate page
// in the `pages` directory, and navigation would be handled by the Next.js router.
const VendorPortal = () => {
  const [currentView, setCurrentView] = useState('registration');
  const [user, setUser] = useState(null); // Represents the logged-in user
  const [isVerified, setIsVerified] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);

  // In a real application, this would be a real-time listener from Firebase Authentication and Firestore.
  useEffect(() => {
    // Mock user login for demonstration purposes
    const mockUser = {
      id: 'user_12345',
      name: 'John Doe',
      isVerified: false,
      isSubscribed: false,
    };
    setUser(mockUser);
  }, []);

  const handleRegistration = (formData) => {
    console.log('Registering user:', formData);
    setCurrentView('onboarding');
  };
  
  const handleSignIn = (formData) => {
    console.log('Signing in user:', formData);
    // In a real app, you would validate credentials here
    setCurrentView('dashboard');
  };

  const handleProfileSubmission = (formData) => {
    console.log('Submitting profile for verification:', formData);
    setCurrentView('verification-pending');
    // Simulate a successful verification after a delay.
    setTimeout(() => {
      setIsVerified(true);
      setCurrentView('dashboard');
    }, 3000);
  };

  const handleSubscription = (tier) => {
    console.log('User subscribed to tier:', tier);
    setIsSubscribed(true);
    setCurrentView('dashboard');
  };

  const handleCreatePromotion = (campaignData) => {
    console.log('Creating new promotion:', campaignData);
    setCurrentCampaign(campaignData);
    setCurrentView('analytics');
  };

  // Helper function to render the correct view based on state
  const renderView = () => {
    switch (currentView) {
      case 'registration':
        return <RegistrationPage onRegister={handleRegistration} setCurrentView={setCurrentView} />;
      case 'signin':
        return <SignInPage onSignIn={handleSignIn} setCurrentView={setCurrentView} />;
      case 'onboarding':
        return <OnboardingPage setCurrentView={setCurrentView} />;
      case 'profile-setup':
        return <ProfileSetupPage onSubmit={handleProfileSubmission} />;
      case 'verification-pending':
        return <VerificationPendingPage />;
      case 'dashboard':
        return <DashboardPage user={user} isVerified={isVerified} isSubscribed={isSubscribed} setCurrentView={setCurrentView} />;
      case 'subscription':
        return <SubscriptionPage onSubscribe={handleSubscription} />;
      case 'promotion-creation':
        return <PromotionCreationPage onCreate={handleCreatePromotion} />;
      case 'analytics':
        return <AnalyticsPage campaign={currentCampaign} />;
      default:
        return <RegistrationPage onRegister={handleRegistration} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased text-gray-800">
      <div className="container mx-auto max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <header className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-purple-800">Vendor Portal</h1>
          <nav className="flex space-x-4">
            {user && (
              <button onClick={() => setCurrentView('dashboard')} className="text-purple-600 hover:text-purple-800 transition-colors">
                Dashboard
              </button>
            )}
            <button onClick={() => setCurrentView('registration')} className="text-gray-600 hover:text-gray-800 transition-colors">
              Sign Out
            </button>
          </nav>
        </header>
        {renderView()}
      </div>
    </div>
  );
};

// All the individual components for each page of the flow are defined below.
const RegistrationPage = ({ onRegister, setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, phone });
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Vendor Registration</h2>
      <p className="text-gray-600 mb-8">Create your account to start selling your properties.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
          <span role="img" aria-label="sign-in">✅</span>
          <span>Register Account</span>
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-600">Already have an account? <button onClick={() => setCurrentView('signin')} className="text-purple-600 font-semibold hover:underline">Sign In</button></p>
      </div>
    </div>
  );
};

const SignInPage = ({ onSignIn, setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn({ email, password });
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Vendor Sign In</h2>
      <p className="text-gray-600 mb-8">Welcome back! Sign in to continue managing your properties.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
          <span role="img" aria-label="sign-in">🔐</span>
          <span>Sign In</span>
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-600">Don't have an account? <button onClick={() => setCurrentView('registration')} className="text-purple-600 font-semibold hover:underline">Sign Up</button></p>
      </div>
    </div>
  );
};

const OnboardingPage = ({ setCurrentView }) => (
  <div className="text-center p-8">
    <h2 className="text-3xl font-bold mb-4 text-purple-800">Welcome to the Vendor Portal!</h2>
    <p className="text-gray-600 mb-6">
      Thank you for joining our platform. Let's get you set up to start listing your properties.
    </p>
    <div className="space-y-4 text-left">
      <p className="flex items-center space-x-2 text-gray-700"><span role="img" aria-label="checkmark">✔️</span><span>Complete your profile.</span></p>
      <p className="flex items-center space-x-2 text-gray-700"><span role="img" aria-label="checkmark">✔️</span><span>Submit documents for verification.</span></p>
      <p className="flex items-center space-x-2 text-gray-700"><span role="img" aria-label="checkmark">✔️</span><span>Start listing your properties!</span></p>
    </div>
    <button onClick={() => setCurrentView('profile-setup')} className="mt-8 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 w-full">
      <span role="img" aria-label="rocket">🚀</span>
      <span>Get Started</span>
    </button>
  </div>
);

const ProfileSetupPage = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    businessRegNumber: '',
    businessType: '',
    serviceOfferings: '',
    nin: null,
    bizRegDoc: null,
    bankAccountName: '',
    bankAccountNumber: '',
    bankName: '',
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">1. Business Details</h3>
            <p className="text-gray-600">Provide information about your business.</p>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="Business Address"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="tel"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              placeholder="Business Phone Number"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="Business Email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="businessRegNumber"
              value={formData.businessRegNumber}
              onChange={handleChange}
              placeholder="Business Registration Number"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              placeholder="Business Type"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              name="serviceOfferings"
              value={formData.serviceOfferings}
              onChange={handleChange}
              placeholder="Service Offerings"
              required
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              onClick={handleNextStep}
              className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
            >
              Next: KYC Details
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">2. KYC & Documents</h3>
            <p className="text-gray-600">Please upload documents for identity and business verification.</p>
            <label className="block">
              <span className="text-gray-700">National Identification Number (NIN) Document</span>
              <input
                type="file"
                name="nin"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Business Registration Document</span>
              <input
                type="file"
                name="bizRegDoc"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>
            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
              >
                Next: Bank Details
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">3. Bank Account Details</h3>
            <p className="text-gray-600">Provide your bank account details for payouts.</p>
            <input
              type="text"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleChange}
              placeholder="Account Name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Bank Name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span role="img" aria-label="upload">📤</span>
                <span>Submit for Verification</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Profile Setup & Verification</h2>
      <p className="text-sm text-gray-500 mb-6">Step {step} of 3</p>
      <form onSubmit={handleFinalSubmit}>
        {renderFormStep()}
      </form>
    </div>
  );
};


const VerificationPendingPage = () => (
  <div className="text-center p-8">
    <h2 className="text-3xl font-bold mb-4 text-yellow-600">Verification Pending</h2>
    <p className="text-gray-600 mb-6">Thank you for submitting your documents. We are currently reviewing your information. This may take a few moments.</p>
    <div className="flex justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-purple-500 animate-spin"></div>
    </div>
  </div>
);

const DashboardPage = ({ user, isVerified, isSubscribed, setCurrentView }) => {
  const renderDashboardContent = () => {
    if (!isVerified) {
      return (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-6">
          <p className="font-bold">Verification Pending</p>
          <p>Your profile is currently under review. You will gain full access to the platform once verified.</p>
        </div>
      );
    }
    if (!isSubscribed) {
      return (
        <>
          <div className="bg-purple-100 border border-purple-300 text-purple-800 p-4 rounded-lg mb-6">
            <p className="font-bold">Free Tier Access</p>
            <p>You have basic access. Upgrade your plan to unlock powerful features like analytics and promotions.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Your Listings</h3>
            <p className="text-gray-500 italic">No listings yet. Start adding your properties!</p>
            <button onClick={() => setCurrentView('subscription')} className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
              <span role="img" aria-label="upgrade">✨</span>
              <span>Upgrade Now</span>
            </button>
          </div>
        </>
      );
    }
    // Render enhanced dashboard
    return (
      <>
        <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg mb-6">
          <p className="font-bold">Subscription Active</p>
          <p>You have full access to all features. Start creating campaigns and track your success!</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center space-x-2"><span role="img" aria-label="charts">📊</span><span>Analytics Dashboard</span></h3>
          <p className="text-gray-500 italic">Your performance metrics will appear here.</p>
          <h3 className="text-xl font-bold flex items-center space-x-2"><span role="img" aria-label="megaphone">📢</span><span>Promotions & Campaigns</span></h3>
          <button onClick={() => setCurrentView('promotion-creation')} className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
            <span role="img" aria-label="plus">➕</span>
            <span>Create New Promotion</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">Welcome, {user?.name || 'Vendor'}</p>
      {renderDashboardContent()}
    </div>
  );
};

const SubscriptionPage = ({ onSubscribe }) => (
  <div className="text-center p-8">
    <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
    <p className="text-gray-600 mb-8">Unlock powerful features to grow your business.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Standard Plan */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border-2 border-purple-500">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">Standard</h3>
        <p className="text-gray-500 text-sm">₦10,000/month</p>
        <ul className="mt-4 text-left space-y-2 text-gray-700">
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Unlimited listings</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Advanced analytics</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Create promotions</span></li>
        </ul>
        <button onClick={() => onSubscribe('Standard')} className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
          <span role="img" aria-label="buy">🛒</span>
          <span>Choose Standard</span>
        </button>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border-2 border-purple-800">
        <h3 className="text-2xl font-bold text-purple-800 mb-2">Enterprise</h3>
        <p className="text-gray-500 text-sm">Custom Pricing</p>
        <ul className="mt-4 text-left space-y-2 text-gray-700">
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>All Standard features</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Social media campaign management</span></li>
          <li className="flex items-center space-x-2"><span role="img" aria-label="checkmark">✔️</span><span>Dedicated account manager</span></li>
        </ul>
        <button onClick={() => onSubscribe('Enterprise')} className="mt-6 w-full bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-900 transition-colors">
          <span role="img" aria-label="contact">📞</span>
          <span>Contact Us</span>
        </button>
      </div>
    </div>
  </div>
);

const PromotionCreationPage = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description, status: 'Live', views: 0, clicks: 0 });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Create New Promotion</h2>
      <p className="text-gray-600 mb-6">Fill in the details for your new promotional campaign.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Campaign Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </label>
        <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
          <span role="img" aria-label="rocket">🚀</span>
          <span>Launch Campaign</span>
        </button>
      </form>
    </div>
  );
};

const AnalyticsPage = ({ campaign }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Campaign Analytics</h2>
    <p className="text-gray-600 mb-6">Track the performance of your campaign.</p>
    {campaign ? (
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
        <h3 className="text-xl font-bold">{campaign.title}</h3>
        <p className="text-gray-700">{campaign.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-800">1,200</p>
            <p className="text-gray-600">Views</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-800">85</p>
            <p className="text-gray-600">Clicks</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center text-gray-500 italic">No campaign data available.</div>
    )}
  </div>
);

export default VendorPortal;
