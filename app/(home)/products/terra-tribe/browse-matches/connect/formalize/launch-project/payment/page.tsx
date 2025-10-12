'use client'


import React, { useState, useCallback, useMemo, ChangeEvent, FormEvent } from 'react';

// --- TypeScript Interfaces and Types ---

type PaymentMethod = 'card' | 'bank' | 'ussd';

interface StatusMessage {
    title: string;
    content: string;
    type: 'success' | 'pending';
}

// --- Icons (Simplified SVGs) ---

const CardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 4H3C1.895 4 1 4.895 1 6v12c0 1.105.895 2 2 2h18c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2zM3 8h18M5 16h3v-2H5v2zm4 0h3v-2H9v2zm4 0h3v-2h-3v2z"/>
    </svg>
);

const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h2v2H6zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/>
    </svg>
);

const USSDIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
);

// --- Status Modal Component (Replaces alert) ---

const StatusModal: React.FC<{ message: StatusMessage | null, onClose: () => void }> = ({ message, onClose }) => {
    if (!message) return null;

    const typeClasses = message.type === 'success' 
        ? 'text-green-600 border-green-200' 
        : 'text-yellow-600 border-yellow-200';
    const titleClasses = message.type === 'success' ? 'text-green-600' : 'text-yellow-600';

    return (
        <div 
            id="message-box" 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
            <div 
                id="message-modal-content" 
                className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all duration-300 scale-100 opacity-100"
            >
                <h3 className={`text-xl font-bold ${titleClasses} mb-3 border-b pb-2`}>{message.title}</h3>
                <p id="message-content" className="text-gray-700 mb-6">{message.content}</p>
                <button 
                    id="message-close-btn" 
                    onClick={onClose}
                    className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                >
                    Got It
                </button>
            </div>
        </div>
    );
};

// --- Form Field Components ---

const CardFormFields: React.FC = () => (
    <div id="card-form-fields" className="space-y-4">
        <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
            <input 
                type="text" id="card-number" name="card-number" placeholder="0000 0000 0000 0000" 
                required 
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
        </div>
        <div className="flex space-x-4">
            <div className="flex-1">
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input 
                    type="text" id="expiry" name="expiry" placeholder="MM/YY" 
                    required 
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
            </div>
            <div className="flex-1">
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                <input 
                    type="text" id="cvc" name="cvc" placeholder="CVC" 
                    required 
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
            </div>
        </div>
    </div>
);

const BankFormFields: React.FC = () => (
    <div id="bank-form-fields">
        <p className="text-center text-gray-600">Please initiate a bank transfer to the following account details:</p>
        <div className="bg-purple-50 p-6 rounded-xl mt-4 space-y-2 border border-purple-200">
            <p className="text-sm text-gray-700"><strong>Bank:</strong> SQUADCo Bank</p>
            <p className="text-sm text-gray-700"><strong>Account Name:</strong> Space Match Ventures</p>
            <p className="text-sm text-gray-700"><strong>Account Number:</strong> <span className="font-mono text-purple-600 font-bold">1234567890</span></p>
            <p className="text-sm text-gray-700"><strong>Amount:</strong> <span className="font-bold text-purple-600">NGN50,000,000</span></p>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">No further action is required here. Complete the transfer through your bank.</p>
    </div>
);

const USSDFormFields: React.FC = () => (
    <div id="ussd-form-fields">
        <p className="text-center text-gray-600">Dial the following code on your phone to complete the payment:</p>
        <div className="bg-purple-50 p-6 rounded-xl mt-4 text-center border border-purple-200">
            <p className="text-2xl font-mono font-extrabold text-purple-800">*990*0050000*123#</p>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">No further action is required here. Complete the transaction on your device.</p>
    </div>
);


// --- Main PaymentPage Component ---

const PaymentPage: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const handleMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value as PaymentMethod);
    };

    const handleCloseModal = useCallback(() => {
        setStatusMessage(null);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Simulate payment processing time
        setTimeout(() => {
            let message: StatusMessage;

            if (selectedMethod === 'card') {
                // Card submission success
                message = {
                    title: "Payment Success!",
                    content: "Payment received. Confirmation emails have been sent to you and your partners.",
                    type: 'success'
                };
            } else {
                // Manual confirmation (Bank/USSD) success
                message = {
                    title: "Confirmation Pending",
                    content: "Deposit is pending confirmation. Please check your email for the next steps and transaction ID.",
                    type: 'pending'
                };
            }
            
            setIsConfirmed(true);
            setStatusMessage(message);

        }, 1000);
    };

    // Derived values for the Pay Button
    const payButtonText = useMemo(() => {
        switch (selectedMethod) {
            case 'card':
                return 'Pay with Card';
            case 'bank':
                return 'I have made the transfer';
            case 'ussd':
                return 'I have completed the USSD transaction';
            default:
                return 'Complete Payment';
        }
    }, [selectedMethod]);

    // Conditional rendering for form fields
    const renderFormFields = () => {
        switch (selectedMethod) {
            case 'card':
                return <CardFormFields />;
            case 'bank':
                return <BankFormFields />;
            case 'ussd':
                return <USSDFormFields />;
            default:
                return null;
        }
    };

    // Payment Method Selector Component Logic
    const paymentOptions: { icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string, value: PaymentMethod }[] = [
        { icon: CardIcon, label: 'Card', value: 'card' },
        { icon: BankIcon, label: 'Bank', value: 'bank' },
        { icon: USSDIcon, label: 'USSD', value: 'ussd' },
    ];


    // --- Main Render Logic ---

    return (
        <div className="bg-gray-100 min-h-screen px-6 pt-28 pb-10  flex items-center justify-center font-['Inter']">
            {statusMessage && <StatusModal message={statusMessage} onClose={handleCloseModal} />}
            
            <div className="container mx-auto">
                
                {/* --- Confirmation Section --- */}
                {isConfirmed && (
                    <section 
                        id="confirmation-section" 
                        className="confirmation-container bg-white rounded-xl shadow-lg p-8 text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <span className="flex items-center justify-center h-20 w-20 bg-green-100 text-green-600 rounded-full">
                                <CheckIcon className="h-12 w-12" />
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Confirmed!</h2>
                        <p className="text-gray-600 text-lg">Thank you for your deposit. An email confirmation has been sent to you and all your partners with the order details and next steps.</p>
                        <a href="#" className="mt-8 inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300">
                            Track My Project
                        </a>
                    </section>
                )}

                {/* --- Payment Form Section --- */}
                {!isConfirmed && (
                    <section 
                        id="payment-section" 
                        className="payment-form-container bg-white rounded-xl shadow-lg p-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Secure Deposit Payment</h2>
                        
                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center shadow-inner">
                            <span className="text-lg text-gray-600">Your Deposit Amount</span>
                            <p className="text-4xl font-extrabold text-purple-600 mt-1">NGN50,000,000</p>
                        </div>
                        
                        {/* Payment Method Selection */}
                        <h3 className="font-bold text-lg text-gray-800 mb-3">Choose Payment Method</h3>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {paymentOptions.map(option => (
                                <div 
                                    key={option.value}
                                    className={`payment-option-card flex flex-col items-center p-4 rounded-xl bg-gray-50 ring-2 ring-transparent ${selectedMethod === option.value ? 'active' : ''}`}
                                    onClick={() => setSelectedMethod(option.value)}
                                >
                                    <input 
                                        type="radio" 
                                        name="payment-method" 
                                        id={option.value} 
                                        value={option.value} 
                                        className="hidden" 
                                        checked={selectedMethod === option.value}
                                        onChange={handleMethodChange}
                                    />
                                    <label htmlFor={option.value} className="block w-full text-center cursor-pointer">
                                        <option.icon className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">{option.label}</span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Payment Form */}
                        <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
                            {renderFormFields()}
                            
                            <button 
                                type={selectedMethod === 'card' ? 'submit' : 'button'}
                                onClick={selectedMethod !== 'card' ? handleSubmit : undefined}
                                id="pay-button" 
                                className="w-full bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-purple-700 transition-colors duration-300 mt-6"
                            >
                                {payButtonText}
                            </button>
                        </form>
                    </section>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
