
import axiosClient from "@/axios-server";
import { setSessionCookie } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  // console.log(req.json());
  
  try {
    // 2. Get data and secrets
    const {name, email, code, mobile, password, business_name, developer_type, terms_and_conditions, refund_policy} = await req.json()
    const apiEndpoint = `signup/developer`;
    // const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/signup/developer`;

    if (!name || !email || !code || !mobile || !password || !business_name || !developer_type || !terms_and_conditions || !refund_policy) {
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
      business_name, 
      developer_type, 
      terms_and_conditions, 
      refund_policy
    };
        // 4. Make the request
      const res = await axiosClient.post(apiEndpoint, options)
      // console.log(res);  

      if (res.status === 201) {
          const token = res?.data.token;
          //set and save token as api key
        await setSessionCookie(token)
        const data = JSON.stringify(res.data);
        console.log(data);
        return NextResponse.json({status: 201, msg: "Successful", resData: data})
      }

      // .then((response) => {
      //       console.log(response)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     const response = err.response;
      //       if (response && response.status === 422) {
      //           const errors = response.data.errors;
      //         if (errors) {
      //           const newErrors = Object.keys(errors).map((key: any)=> (
      //             errors[key][0]
      //           ))
      //           // console.log(response.data.errors)
      //           console.log(newErrors)
      //           return NextResponse.json({errors: JSON.stringify(newErrors)});
      //         }else{
      //           console.log(response.data.msg);
      //         }
      //       }else{
                
      //       }
      //   })
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ errorData: error});
  }
}
