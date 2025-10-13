
import axiosClient from "@/axios-server";
import { getToken } from "@/lib/actions/user.action";
import fs, { writeFile } from 'fs/promises';
import path from 'path';

import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const propDoc = formData.get('document') as Blob as File;

    console.log(propDoc);

    if (!propDoc) {
      return NextResponse.json({ success: false, message: 'No document file uploaded.' }, { status: 400 });
    }

    const propDocBytes = await propDoc.arrayBuffer();
    const propDocBuffer = Buffer.from(propDocBytes);

    // 2. Define the path where the file will be saved
    // We'll save it in the `public/uploads` directory.
    const uploadsDir = path.join(process.cwd(), '/public/vendor/docs');
    const propDocFilePath = path.join(uploadsDir, propDoc.name);

    // Note: In a real app, you'd want to sanitize the filename
    // to prevent path traversal attacks.

    // 3. Write the file to the filesystem
    await writeFile(propDocFilePath, propDocBuffer);
    const propDocFileBlob = new Blob([propDocBuffer], { type: propDoc.type });

    formData.delete("document");
    formData.append("document", propDoc, propDoc.name);

    
    const apiKey = getToken()
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/property`;
    
    if (!apiEndpoint || !apiKey) {
      console.error("Server configuration error.");
      return NextResponse.json({ error: 'Server configuration error.' });
    }
    //     // 4. Make the request
      const res = await axiosClient.post(apiEndpoint, formData)
      // console.log(res);
        const response = res.data
        // console.log(response);
        return NextResponse.json({'message': response.status, 'data': JSON.stringify(response)})

      // .then((response) => {
      //   console.log(response)
      //   const res = response.data
      //   return NextResponse.json(JSON.stringify(res))
      // })
      // .catch(err => {
      //   console.log(err)
      //   const response = err.response;
      //   console.log(response);
        
      //     if (response && response.status === 422) {
      //         const errors = response.data.errors;
      //       if (errors) {
      //         const newErrors = Object.keys(errors).map((key: any)=> (
      //           errors[key][0]
      //         ))
      //         // console.log(response.data.errors)
      //         console.log(newErrors)
      //         return NextResponse.json({errors: JSON.stringify(newErrors)});
      //       }else{
      //         console.log(response.data.msg);
      //       }
      //     }else{
              
      //     }
      // })


      // if (res.status === 201) {
      //   console.log(res);
      //   // const data = JSON.stringify(res.data);
      //   return NextResponse.json({status: 201, msg: "Successful", resData: res})
      // }
      
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ errorData: error});
  }
}
