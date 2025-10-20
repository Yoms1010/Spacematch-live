import axiosClient from "@/axios-server";
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
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/reset-password`;

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
      },
      body: JSON.stringify({
       email,
       password
      }),
    };

    const apiResponse = await fetch(apiEndpoint, options);
    // console.log(apiResponse);
    
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return NextResponse.json(errorText);
    }
    const data = await apiResponse.json();
    // console.log(data);
    return NextResponse.json(data);

    // await axiosClient.post("/reset-password", {email, password})
    //     .then((response) => {
    //         console.log(response)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       const response = err.response;
    //         if (response && response.status === 422) {
    //             const errors = response.data.errors;
    //             console.log(errors)
    //           if (errors) {
    //             const newErrors = Object.keys(errors).map((key: any)=> (
    //               errors[key][0]
    //             ))
    //             // console.log(response.data.errors)
    //             console.log(newErrors)
    //             return NextResponse.json({errors: JSON.stringify(newErrors)});
    //           }else{
    //             console.log(response.data.msg);
    //           }
    //         }else{
                
    //         }
    //     })
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ error: 'An internal server error occurred.' });
  }
}
