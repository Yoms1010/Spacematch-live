import { getToken } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        // 2. Get data and secrets
        const {vendor_id, vendor_sc_id, title, amount, currency, transaction_ref, payment_option, status, active} = await req.json();
        const apiKey = await getToken();
        const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/vendor/subscription`;

        if (!apiKey || !apiEndpoint) {
            console.error("Server configuration error.");
            return NextResponse.json({ error: 'Server configuration error.' });
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
        const apiResponse: any = await fetch(apiEndpoint, options);
    
        console.log(apiResponse);
        
        if (!apiResponse.ok) {
            const errorText = await apiResponse?.Response?.statusText();
            console.log(apiResponse);
            
            return NextResponse.json({ error: `API request failed: ${errorText}` });
        }
    
        const data = await apiResponse.json();

        return NextResponse.json(data);
    
    } catch (error) {
        console.error("Error in proxy API route:", error);
        return NextResponse.json({ error: 'An internal server error occurred.'});
    }
}