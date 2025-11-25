
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
    const {name, email, code, mobile, password, occupation, terms_and_conditions, refund_policy} = await req.json()
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/signup/buyer`;

    if (!name || !email || !code || !mobile || !password || !terms_and_conditions || !refund_policy) {
      return NextResponse.json({ error: 'Missing required fields.' });
    }
    
    if (!apiEndpoint) {
        console.error("Server configuration error.");
        return NextResponse.json({ error: 'Server configuration error.' });
    }

    // 3. Prepare the request for the third-party API
    const options = {
      name, 
      email, 
      code, 
      mobile, 
      password, 
      occupation, 
      terms_and_conditions, 
      refund_policy
    };

    // 4. Make the request
    const res = await axiosClient.post(apiEndpoint, options)

    if (res.status === 201) {
      const data = JSON.stringify(res.data);
      // console.log(data);
      return NextResponse.json({status: 201, msg: "Successful", resData: data})
    }

    // .then((response) => {
    //         console.log(response)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       const response = err.response;
    //         if (response && response.status === 422) {
    //             const errors = response.data.errors;
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
    return NextResponse.json({ error: `An internal server error occurred.-> ${error}` });
  }
}
