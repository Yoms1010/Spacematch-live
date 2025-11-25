"use server"

import { cookies } from "next/headers";

export const getCurrentClientChatCount = async () => {
    try {
    const cookieStore = await cookies();

    const apiKey = cookieStore.get("ACCESS_TOKEN")?.value || "";
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/current-buyer-chat-count`;

    
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

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.log(errorText);
      
      return errorText
    }
    const data = await apiResponse.json();

    // 5. Relay the successful response
    return data;

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return { error: 'An internal server error occurred.' };
  }
};

export const getCurrentAgentChatCount = async () => {
    try {
    const cookieStore = await cookies();

    const apiKey = cookieStore.get("ACCESS_TOKEN")?.value || "";
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/current-agent-chat-count`;

    
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

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.log(errorText);
      
      return errorText
    }
    const data = await apiResponse.json();

    // 5. Relay the successful response
    return data;

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return { error: 'An internal server error occurred.' };
  }
};
