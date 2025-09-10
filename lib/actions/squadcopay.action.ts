'use server'

import { ClientSubDataProps, VendorSubDataProps } from "@/types";
import { getToken } from "./user.action";
import { NextResponse } from "next/server";

// console.log(Math.random());


export async function squadcoPayVendorTransactions(payLoad: VendorSubDataProps){

     try {
       // 2. Get data and secrets
       const {vendor_id, vendor_sc_id, title, amount, currency, transaction_ref, payment_option, status, active} = payLoad;
       const apiKey = await getToken();
       const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/client/subscription`;

       if (!apiEndpoint) {
           console.error("Server configuration error.");
           return { error: 'Server configuration error.' };
       }
   
       // 3. Prepare the request for the third-party API
       const options = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${apiKey}`,
         },
         body: JSON.stringify({
          vendor_id, 
          vendor_sc_id, 
          title, 
          amount, 
          currency, 
          transaction_ref, 
          payment_option, 
          status, 
          active
         }),
       };
   
       // 4. Make the request
       const apiResponse = await fetch(apiEndpoint, options);
   
       if (!apiResponse.ok) {
         const errorText = await apiResponse.text();
         return { error: `API request failed: ${errorText}` };
       }
   
       const data = await apiResponse.json();

   
       return data;
   
     } catch (error) {
       console.error("Error in proxy API route:", error);
       return { error: 'An internal server error occurred.' };
     }
}


export async function squadcoPayClientTransactions(payLoad: ClientSubDataProps){

     try {
       // 2. Get data and secrets
       const {client_id, client_sc_id, title, amount, currency, transaction_ref, payment_option, status, active} = payLoad;
       const apiKey = await getToken();
       const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/client/subscription`;

       if (!apiKey || !apiEndpoint) {
           console.error("Server configuration error.");
           return { error: 'Server configuration error.' };
       }
   
       // 3. Prepare the request for the third-party API
       const options = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${apiKey}`,
         },
         body: JSON.stringify({
          client_id, 
          client_sc_id, 
          title, 
          amount, 
          currency, 
          transaction_ref, 
          payment_option, 
          status, 
          active
         }),
       };
   
       // 4. Make the request
       const apiResponse = await fetch(apiEndpoint, options);
   
       if (!apiResponse.ok) {
         const errorText = await apiResponse.text();
         return { error: `API request failed: ${errorText}` };
       }
   
       const data = await apiResponse.json();

       return data;
   
     } catch (error) {
       console.error("Error in proxy API route:", error);
       return NextResponse.json({ error: 'An internal server error occurred.' });
     }
}