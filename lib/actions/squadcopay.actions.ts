'use server'

import { RequestDataProps } from "@/types";

// console.log(Math.random());


export async function squadcoPay(req: RequestDataProps){
    // URL of the API endpoint
    const apiUrl = 'https://sandbox-api-d.squadco.com/transaction/initiate';

    // Data to send in the request body
    const { 
        email, amount, currency, customer_name, initiate_type, transaction_ref, payment_channels, callback_url,
        metadata,
        pass_charge,
        sub_merchant_id
    } = await req;

    const requestData = {
        email, 
        amount, 
        currency, 
        customer_name, 
        initiate_type, 
        transaction_ref,
        payment_channels,
        callback_url,
        metadata,
        pass_charge,
        sub_merchant_id
    }

    // Custom headers
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': process.env.SQUADCO_SANDBOX_API_KEY! // Replace with your actual token
    };

    // Making the API request
    fetch(apiUrl, {
        method: 'POST',          // or 'GET', 'PUT', etc.
        headers: headers,
        body: JSON.stringify(requestData) // Must be a string for most APIs
    })
    .then(response => {
        if (!response.ok) {
            console.log(`Server responded with status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}