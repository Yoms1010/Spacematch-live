"use server"


import axiosClient from "@/axios-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Set cookie in the browser
  cookieStore.set("ACCESS_TOKEN", idToken);
}


export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("ACCESS_TOKEN")?.value;
  
  return token;
}

export const getAuthenticatedUser = async () => {
  try {
    const apiKey = await getToken();
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/user`;

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
      // console.log(errorText);
      return 0;
    }

    const data = await apiResponse.json();

    // 5. Relay the successful response
    return data;

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return { error: 'An internal server error occurred.' };
  }
};

export const isAthenticated = async () => {
  const token = await getToken();
  if (token) {
    return true;
  }
  return false;

}


export const logout = async () => {
  try {
    const apiKey = await getToken();
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/logout`;

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

    const removeToken = cookieStore.delete("ACCESS_TOKEN")

    return {
      status: 200, 
      message: "Logout successful", 
      data: removeToken
    };

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return { error: 'An internal server error occurred.' };
  }
};


