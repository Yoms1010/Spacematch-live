
import axiosClient from "@/axios-server";
import { getToken } from "@/lib/actions/user.action";
import fs, { writeFile } from 'fs/promises';
import path from 'path';

import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const vendorId = formData.get("vendorId"); 

    // const ninf: File | null = formData.get('nin') as unknown as File;
    const bizRegDoc: File | null = formData.get('business_reg_doc') as unknown as File;
    const profilePhoto: File | null = formData.get('profile_photo') as unknown as File;

    if (!bizRegDoc) {
      return NextResponse.json({ success: false, message: 'No business registration document uploaded.' }, { status: 400 });
    }
    if (!profilePhoto) {
      return NextResponse.json({ success: false, message: 'No profile photo uploaded.' }, { status: 400 });
    }

    // return console.log(formData);

    // 1. Get the file data as a buffer
    // const ninBytes = await ninf.arrayBuffer();
    const bizRegDocBytes = await bizRegDoc.arrayBuffer();
    const profilePhotoBytes = await profilePhoto.arrayBuffer();
    // const ninBuffer = Buffer.from(ninBytes);
    const bizRegDocBuffer = Buffer.from(bizRegDocBytes);
    const profilePhotoBuffer = Buffer.from(profilePhotoBytes);


    // 2. Define the path where the file will be saved
    // We'll save it in the `public/uploads` directory.
    // const uploadsDir = path.join(process.cwd(), '/vendor/docs');
    // const uploadsDir2 = path.join(process.cwd(), '/vendor/docs');
    // const dpDir = path.join(process.cwd(), '/vendor/dp');
    // const ninFilePath = path.join(uploadsDir, ninf.name);
    // const bizRegDocFilePath = path.join(uploadsDir2, bizRegDoc.name);
    // const profilePhotoFilePath = path.join(dpDir, profilePhoto.name);

    // Note: In a real app, you'd want to sanitize the filename
    // to prevent path traversal attacks.

    // 3. Write the file to the filesystem
    // await writeFile(ninFilePath, ninBuffer);
    // await writeFile(bizRegDocFilePath, bizRegDocBuffer);
    // await writeFile(profilePhotoFilePath, profilePhotoBuffer);
    // console.log(`File saved to: ${filePath}`);

    // 3. Create a Blob from the buffer
    // const ninFileBlob = new Blob([ninBuffer], { type: ninf.type });
    const bizRegDocFileBlob = new Blob([bizRegDocBuffer], { type: bizRegDoc.type });
    const profilePhotoFileBlob = new Blob([profilePhotoBuffer], { type: profilePhoto.type });
    // formData.delete("nin");
    formData.delete("business_reg_doc");
    formData.delete("profile_photo");

    // formData.append("nin", ninFileBlob, ninf.name);
    formData.append("business_reg_doc",bizRegDocFileBlob, bizRegDoc.name);
    formData.append("profile_photo", profilePhotoFileBlob, profilePhoto.name);
    
    const apiKey = getToken()
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/developer/${vendorId}`;
    
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
