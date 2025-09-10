
import axiosClient from "@/axios-server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface MyRequestBody {
    name: string;
    age: number;
  }

  interface ExtendedNextApiRequest extends NextApiRequest {
    body: MyRequestBody;
  }


export async function POST(req: Request) {

  try {
    // 2. Get data and secrets
    const {name, email, code, mobile, password, business_name, developer_type, terms_and_conditions, refund_policy} = await req.json()
    // const apiKey = process.env.THIRD_PARTY_API_KEY;
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/signup/developer`;

    if (!name || !email || !code || !mobile || !password || !business_name || !developer_type || !terms_and_conditions || !refund_policy) {
      return NextResponse.json({ error: 'Missing required fields.' });
    }
    
    if (!apiEndpoint) {
        console.error("Server configuration error.");
        return NextResponse.json({ error: 'Server configuration error.' });
    }

    // 3. Prepare the request for the third-party API
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        name, 
        email, 
        code, 
        mobile, 
        password, 
        business_name, 
        developer_type, 
        terms_and_conditions, 
        refund_policy
      })
    };

    // 4. Make the request
    const apiResponse: any = await axiosClient.post(apiEndpoint, options);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return NextResponse.json(errorText);
    }

    const data = await apiResponse.json();

    // 5. Relay the successful response
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ error: `An internal server error occurred.-> ${error}` });
  }
}
