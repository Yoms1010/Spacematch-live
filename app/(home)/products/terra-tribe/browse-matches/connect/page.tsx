'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- Type Definitions ---
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'partner';
    time: string;
}

// --- Mock Data ---
const PARTNER_NAME = "Jane Smith";
const PARTNER_MATCH_SCORE = 88;
const PARTNER_AVATAR = "https://placehold.co/50x50/E2E8F0/64748B?text=JS";

const initialChat: Message[] = [
    { id: 1, text: `Hi ${PARTNER_NAME}! I'm excited to connect and discuss our co-ownership goals. Your profile looks like a great match for what I'm looking for.`, sender: 'user', time: '9:30 AM' },
    { id: 2, text: "Hi! I feel the same way. Your vision for a vacation home really resonates with me. What's the best time to chat this week?", sender: 'partner', time: '9:32 AM' },
];

// --- Sub-Components ---

// 1. Chat Bubble Component
const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    const bubbleClasses = isUser
        ? 'bg-purple-600 text-white rounded-tr-lg rounded-bl-lg rounded-tl-lg ml-auto'
        : 'bg-gray-200 text-gray-800 rounded-tl-lg rounded-br-lg rounded-tr-lg mr-auto';
    const alignmentClasses = isUser ? 'justify-end' : 'justify-start';
    const timeClasses = isUser ? 'text-right text-purple-200' : 'text-left text-gray-500';

    return (
        <div className={`flex ${alignmentClasses}`}>
            <div className={`p-3 rounded-xl max-w-xs sm:max-w-md shadow-md ${bubbleClasses}`}>
                <p className={`text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>{message.text}</p>
                <span className={`text-xs mt-1 block ${timeClasses}`}>{message.time}</span>
            </div>
        </div>
    );
};

// 2. SVG Icons (re-defined as components)
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.38 0 2.5 1.12 2.5 2.5S13.38 11 12 11s-2.5-1.12-2.5-2.5S10.62 6 12 6zm-2 14c-2.67 0-8-1.34-8-4v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1c0 2.66-5.33 4-8 4z"/>
    </svg>
);

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3v6l15 3-15 3v6z"/>
    </svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zm-5-6h-5v5h5V6zM3 3v18h18V3H3zm16 16H5V5h14v14z"/>
    </svg>
);

const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h-2v6z"/>
    </svg>
);

// --- Main ConnectToMatch Component ---
const ConnectToMatch: React.FC = () => {
    const router = useRouter()
    const [chatHistory, setChatHistory] = useState<Message[]>(initialChat);
    const [newMessage, setNewMessage] = useState('');
    const [scheduleMessage, setScheduleMessage] = useState<string | null>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    // Auto-scroll effect
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // Handles user message submission and simulates a partner response
    const handleSend = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const trimmedMessage = newMessage.trim();
        if (trimmedMessage) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newMsg: Message = {
                id: Date.now(),
                text: trimmedMessage,
                sender: 'user',
                time: timeString,
            };

            setChatHistory(prev => [...prev, newMsg]);
            setNewMessage('');

            // Simulate partner response after a short delay
            setTimeout(() => {
                const partnerResponse: Message = {
                    id: Date.now() + 1,
                    text: "Got it. I'm free on Tuesday morning. Does 10 AM work for you to discuss location options?",
                    sender: 'partner',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setChatHistory(prev => [...prev, partnerResponse]);
            }, 1000);
        }
    }, [newMessage]);

    // Handler for Schedule button (replaces alert() with temporary notification)
    const handleSchedule = useCallback(() => {
        setScheduleMessage("Opening scheduling tool... Please wait for the external link.");
        setTimeout(() => setScheduleMessage(null), 4000); // Clear message after 4 seconds
        console.log("Scheduler triggered for partner: Jane Smith");
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-10 font-['Inter']">
            <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center border-b-4 border-purple-600 mx-auto" style={{ maxWidth: '1200px' }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Initiate Connection & Chat</h1>
                <p className="mt-2 text-md text-gray-600">
                    You've connected with a potential co-owner! Discuss your goals and plan your project.
                </p>
            </header>

            <main className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ maxWidth: '1200px' }}>
                {/* --- Main Chat Interface (2/3 width on large screens) --- */}
                <section className="lg:col-span-2 bg-white rounded-xl shadow-2xl flex flex-col h-[80vh] min-h-[500px]">
                    {/* Chat Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img className="h-12 w-12 rounded-full border-2 border-purple-400 object-cover" src={PARTNER_AVATAR} alt="Partner Avatar" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Partner: {PARTNER_NAME}</h3>
                                <p className="text-sm text-green-500 font-medium">Active now</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Chat History */}
                    <div ref={chatRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gray-50">
                        {chatHistory.map(msg => (
                            <ChatBubble key={msg.id} message={msg} />
                        ))}
                    </div>
                    
                    {/* Chat Input Form */}
                    <form onSubmit={handleSend} className="p-4 sm:p-6 border-t border-gray-200 bg-white">
                        <div className="flex space-x-3">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message here..." 
                                className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 shadow-inner transition-colors"
                            />
                            <button 
                                type="submit" 
                                disabled={!newMessage.trim()}
                                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors duration-300 disabled:bg-purple-300 shadow-lg"
                            >
                                <SendIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                </section>

                {/* --- Sidebar (1/3 width on large screens) --- */}
                <aside className="lg:col-span-1 space-y-6">
                    {/* Partner Details Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-purple-400">
                        <div className="flex items-center space-x-4 mb-4">
                             <span className="p-3 bg-purple-100 rounded-full text-purple-600 shadow-md">
                                <UserIcon className="h-6 w-6" />
                            </span>
                            <h3 className="text-xl font-extrabold text-gray-800">{PARTNER_NAME}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Compatible on budget, location, and project timeline. View full profile after subscription.
                        </p>
                        <div className="mt-4">
                            <span className="bg-purple-600 text-white text-2xl font-extrabold px-6 py-2 rounded-full shadow-xl">
                                {PARTNER_MATCH_SCORE}% Match
                            </span>
                        </div>
                    </div>

                    {/* Scheduling Tool */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <CalendarIcon className="h-6 w-6 text-purple-600" />
                            <span>Schedule a Meeting</span>
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Use our scheduling tool to find a time that works for both of you.
                        </p>
                        <button 
                            onClick={handleSchedule} 
                            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-300 shadow-md"
                        >
                            Open Scheduler
                        </button>
                        {scheduleMessage && (
                            <p className="mt-3 p-3 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg transition-opacity duration-500">
                                {scheduleMessage}
                            </p>
                        )}
                    </div>
                    
                    {/* Mediation Service */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <InfoIcon className="h-6 w-6 text-purple-600" />
                            <span>Mediation Service</span>
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Need help with a structured discussion? Our professional mediators can facilitate a productive conversation.
                        </p>
                        <button className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-300 shadow-md">
                            Request a Mediator
                        </button>
                    </div>
                    
                    {/* Final CTA */}
                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => router.push("/products/terra-tribe/browse-matches/connect/formalize")}
                            className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]">
                            Move Forward with This Group
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default ConnectToMatch;
