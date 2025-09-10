import React from 'react';
import FAQItem from './FAQItem';


type FAQSectionProps = {
  title: string;
  svgPath: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

const FAQSection: React.FC<FAQSectionProps> = ({ title, svgPath, faqs }) => {
  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-purple-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={svgPath} />
        </svg>
        <span>{title}</span>
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
