'use client'; // This directive is necessary for Next.js to treat this as a client component

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real-world application, you would send this data to an API endpoint here.
    // For now, we'll just log it and show an alert.
    console.log('Form data submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');

    // Reset the form fields
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:p-8">
      {/* Main content container, styled like a modern card */}
      <div className="bg-gray-100 rounded-2xl shadow-xl max-w-4xl w-full mt-24 pt-4 max-sm:p-12 space-y-8">
        {/* Header section */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Get in Touch</h1>
          <p className="text-lg md:text-xl text-gray-600">
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
        </header>

        {/* Contact form section */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input */}
            <div className='shadow-md'>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-main-100 focus:border-main-100 sm:text-sm p-3 transition-colors duration-200"
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div className='shadow-md'>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-main-100 focus:border-main-100 sm:text-sm p-3 transition-colors duration-200"
                  required
                />
              </div>
            </div>

            {/* Message textarea */}
            <div className='shadow-md'>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-main-100 focus:border-main-100 sm:text-sm p-3 transition-colors duration-200"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent shadow-md text-sm font-medium text-white bg-main-100 hover:bg-main-100/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-100 transition-colors duration-200 rounded-xl"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact information section */}
        <div className="text-center text-gray-600 mt-8 space-y-2">
          <p>You can also reach us at:</p>
          <p className="font-medium">
            Email: <a href="mailto:info@spacematch.com.ng" className="text-main-100 hover:underline">info@spacematch.com.ng</a>
          </p>
          <p className="font-medium">
            Phone: <a href="tel:+1234567890" className="text-main-100 hover:underline">+1 (234) 567-890</a>
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            {/* Social media icons would go here, using SVG or a library like Font Awesome */}
            <a href="#" className="text-main-100 hover:text-main-100 transition-colors duration-200">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.25 12h-4.34a.75.75 0 010-1.5h4.34a.75.75 0 010 1.5zm-4.34-8.25h4.34a.75.75 0 010 1.5h-4.34a.75.75 0 010-1.5zm4.34 16.5h-4.34a.75.75 0 010-1.5h4.34a.75.75 0 010 1.5zM12 22.25H3.75a.75.75 0 010-1.5H12a.75.75 0 010 1.5zm0-4.34H3.75a.75.75 0 010-1.5H12a.75.75 0 010 1.5zm0-4.34H3.75a.75.75 0 010-1.5H12a.75.75 0 010 1.5zm0-4.34H3.75a.75.75 0 010-1.5H12a.75.75 0 010 1.5zM12 3.75H3.75a.75.75 0 010-1.5H12a.75.75 0 010 1.5z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
