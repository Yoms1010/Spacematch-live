
import axiosClient from "@/axios-server";
import { getToken } from "@/lib/actions/user.action";
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // 2. Get data and secrets
    // const resp = await req.json()
    // return console.log(resp);
    
    const formData = await req.formData();
        const vendorId = formData.get("vendorId"); 
        const name = formData.get("name"); 
        const email = formData.get("email"); 
        const business_name = formData.get("business_name"); 
        const mobile = formData.get("mobile"); 
        const city = formData.get("city"); 
        const lga = formData.get("lga"); 
        const state = formData.get("state"); 
        const country = formData.get("country"); 
        const developer_type = formData.get("developer_type"); 
        const areas_of_operation = formData.get("areas_of_operation"); 
        const developer_reg_no = formData.get("developer_reg_no"); 
        const tin = formData.get("tin");
        const certifications = formData.get("certifications"); 
        const bio = formData.get("bio"); 
        const proof_of_ownership = formData.get("proof_of_ownership");
        const cac = formData.get("cac");
        const profile_photo = formData.get("profile_photo");   
    
    const apiKey = getToken()
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/developer/${vendorId}`;
    
    if (!apiEndpoint || !apiKey) {
        console.error("Server configuration error.");
        return NextResponse.json({ error: 'Server configuration error.' });
    }

    // 3. Prepare the request for the third-party API
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData
    };

    const payLoad = {
      name,
      email,
      business_name ,
      mobile,
      city,
      lga,
      state ,
      country,
      developer_type,
      areas_of_operation, 
      developer_reg_no,
      tin,
      certifications, 
      bio,
      proof_of_ownership: formData.get("proof_of_ownership"),
      cac: formData.get("cac"),
      profile_photo: formData.get("profile_photo")
    }

    // console.log(payLoad);
    
    //     // 4. Make the request
      const res = await axiosClient.post(`/developer/${vendorId}`, payLoad)
      // console.log(res);
      // .then((response) => {
      //       console.log(response)
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


      if (res.status === 201) {
        console.log(res);
        const data = JSON.stringify(res.data);
        return NextResponse.json({status: 201, msg: "Successful", resData: data})
      }
      
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ errorData: error});
  }
}
