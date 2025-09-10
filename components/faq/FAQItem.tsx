'use client'

import React, { useState } from 'react';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`faq-item p-4 rounded-lg bg-gray-50 ${isActive ? 'active' : ''}`}
      onClick={toggleAccordion}
    >
      <div className="faq-question flex justify-between items-center font-bold text-gray-800">
        <span>{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div className="faq-answer mt-2 pl-4 text-gray-600">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
