import { getToken } from "./user.action";

export const getClients = async ()=> {
  try {

      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/buyers`;
      
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


export const getVendors = async ()=> {
  try {

      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/developers`;
      
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

export const getAgents = async () => {
  try {
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/agents`;
      
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


export const getDeveloperById = async (id: number | string) => {
  try {
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/developer/${id}`;
      
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

export const getBuyerById = async (id: number | string) => {
  try {
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/buyer/${id}`;
      
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
        
        return null
      }
  
      const data = await apiResponse.json();
  
      // 5. Relay the successful response
      return data;
  
    } catch (error) {
      console.error("Error in proxy API route:", error);
      return { error: 'An internal server error occurred.' };
    }
}

export const getAgentById = async (id: number | string) => {
  try {
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/agent/${id}`;
      
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