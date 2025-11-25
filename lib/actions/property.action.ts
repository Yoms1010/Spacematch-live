"use server"

import { PropertyItemProps } from "@/types";
import { getToken } from "./user.action";

export const getAllProperties = async (): Promise< PropertyItemProps[]> => {
   const res = await fetch(`${process.env.BACKEND_DEVELOPMENT_API}/property`);

  if (!res.ok) {
    // This will be caught by the nearest error.tsx file
    console.log(res);
  }

  return res.json();
}


export const getPropertyById = async (id: string | number): Promise< PropertyItemProps> => {
   const res = await fetch(`${process.env.BACKEND_DEVELOPMENT_API}/property/${id}`);

  if (!res.ok) {
    // This will be caught by the nearest error.tsx file
    throw new Error('Failed to fetch data');
  }

  return res.json();
}


export const getVendorProperties = async (id: string | number): Promise<any> => {
  try {
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/property-for-developer/${id}`;
  
      
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
}

export const getPropertiesAgents = async (id: string | number): Promise<any> => {
  try {
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/property-for-developer/${id}`;
  
      
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
}
