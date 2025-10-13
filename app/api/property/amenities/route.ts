import { getToken } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const {property_id, title, active} = await req.json();
      const apiKey = await getToken();
      const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/upload-property-amenities`;
  
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
            property_id,
            title, 
            active
        }),
      };
  
      // 4. Make the request
      const apiResponse = await fetch(apiEndpoint, options);
  
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.log(errorText);
        
        return NextResponse.json(errorText)
      }
  
      const data = await apiResponse.json();
  
      // 5. Relay the successful response
      return NextResponse.json(data);
  
    } catch (error) {
      console.error("Error in proxy API route:", error);
      return NextResponse.json({ error: 'An internal server error occurred.' });
    }
}