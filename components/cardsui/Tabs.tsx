// components/Tabs.tsx

"use client"; // This is a client component, as it uses hooks

import { useState } from 'react';

// Define the type for a single tab
interface Tab {
  label: string;
  content: React.ReactNode; // Content can be any valid React node
}

// Define the props for the Tabs component
interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  // State to keep track of the active tab index
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-300 ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-600' // Active tab style
                : 'text-gray-500 hover:text-gray-700'     // Inactive tab style
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        {/* Render the content of the active tab */}
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;