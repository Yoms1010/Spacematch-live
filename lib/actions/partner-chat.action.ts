"use server"

import { getToken } from "./user.action";

export const partnerChatLogic = async (payLoad: any) => {
    try {
        const { sender_id, sender_name, receiver_id, receiver_name, message } = payLoad;

        const apiKey = await getToken();
        const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/partner-chat`;
    
        // console.log(payLoad);
        
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
                sender_id,
                sender_name,
                receiver_id,
                receiver_name,
                message
            })
        };
    
        // 4. Make the request
        const apiResponse = await fetch(apiEndpoint, options);
        // console.log(apiResponse);
        
        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.log(errorText);
            return errorText
        }
    
        const data = await apiResponse.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const fetchPartnerChatLogic = async (payLoad: any) => {
    try {
        const { sender_id, receiver_id} = payLoad;

        const apiKey = await getToken();
        const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/fetch-partner-chat/${sender_id}/${receiver_id}`;
    
        // console.log(payLoad);
        
        if (!apiKey || !apiEndpoint) {
            console.error("Server configuration error.");
            return { error: 'Server configuration error.' };
        }
    
        // 3. Prepare the request for the third-party API
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        };
    
        // 4. Make the request
        const apiResponse = await fetch(apiEndpoint, options);
        // console.log(apiResponse);
        
        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.log(errorText);
            return errorText
        }
    
        const data = await apiResponse.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}