import React from 'react';

const OnboardingSlide = () => {
  return (
    // Main Container - Simulating mobile screen height
    <div className="relative w-full h-screen max-h-[850px] overflow-hidden bg-gray-900 font-sans">
      
      {/* 1. Background Image */}
      <img 
        // Replacing with a placeholder delivery rider image. 
        // You should replace this with your actual asset path.
        src="https://images.unsplash.com/photo-1616406432452-07bc59317520?q=80&w=1888&auto=format&fit=crop" 
        alt="Delivery Rider" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* 2. The Gradient Overlay */}
      {/* This creates the orange tint that fades from bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#A0441E] via-[#A0441E]/60 to-black/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#c25e30] via-transparent to-transparent opacity-90" />

      {/* 3. Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 py-8">
        
        {/* Top: Progress Indicators */}
        <div className="flex gap-2 mt-4">
          {/* Active Step (Solid White) */}
          <div className="h-1.5 flex-1 bg-white rounded-full shadow-sm"></div>
          {/* Inactive Steps (Translucent) */}
          <div className="h-1.5 flex-1 bg-white/30 rounded-full"></div>
          <div className="h-1.5 flex-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Bottom: Text Content */}
        <div className="mb-8 space-y-3">
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Your Deliveries, <br /> Simplified.
          </h1>
          
          <p className="text-white/90 text-base leading-relaxed font-medium max-w-md">
            From bustling streets to your doorstep, send and receive packages with just a few taps. Fast, reliable, and always within reach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlide;