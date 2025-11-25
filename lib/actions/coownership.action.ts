'use server'


import { getToken } from "./user.action";

export const fetchOrCreateGoalsMatches = async (payLoad: any) => {
    try {
        const { client_id, client_name, lga, state, country, project_type, budget} = payLoad;

        const apiKey = await getToken();
        const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/get-goals-matches`;
    
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
                // 'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                client_id,
                client_name,
                lga,
                state,
                country,
                project_type,
                budget
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
        return data;
        
    } catch (error) {
        console.log(error);
    }
}


export const partnershipProjectDepost = async (payLoad: any) => {
    try {
        const { client_id, client_name, lga, state, country, project_type, budget} = payLoad;

        const apiKey = await getToken();
        const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/get-goals-matches`;
    
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
                // 'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                client_id,
                client_name,
                lga,
                state,
                country,
                project_type,
                budget
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
        return data;
        
    } catch (error) {
        console.log(error);
    }
}