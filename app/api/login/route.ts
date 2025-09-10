import { setSessionCookie } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    // return res.status(405).end('Method Not Allowed');
  }

  try {
    // 2. Get data and secrets
    const {email, password} = await req.json();
    // const apiKey = process.env.THIRD_PARTY_API_KEY;
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/login`;

    if (!email || !password) {
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
       email,
       password
      }),
    };

    // 4. Make the request
    const apiResponse = await fetch(apiEndpoint, options);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      // console.log(apiResponse);
      return NextResponse.json(errorText);
    }

    const data = await apiResponse.json();

    // console.log(data);
    const token = data?.token;

    //set and save token as api key
    await setSessionCookie(token)


    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' });
  }
}
