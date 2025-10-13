
import axiosClient from "@/axios-server";
import { getToken } from "@/lib/actions/user.action";


import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // const ninf: File | null = formData.get('nin') as unknown as File;
    const image: File | null = formData.get('image') as unknown as File;

    if (!image) {
      return NextResponse.json({ success: false, message: 'No business registration document uploaded.' }, { status: 400 });
    }

    // return console.log(formData);

    const imageBytes = await image.arrayBuffer();

    const imageBuffer = Buffer.from(imageBytes);

    const imageFileBlob = new Blob([imageBuffer], { type: image.type });

    formData.delete("image");

    formData.append("image", imageFileBlob, image.name);
    
    const apiKey = getToken()
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/property/images`;
    
    if (!apiEndpoint || !apiKey) {
      console.error("Server configuration error.");
      return NextResponse.json({ error: 'Server configuration error.' });
    }
    //     // 4. Make the request
       const res: any = await axiosClient.post(apiEndpoint, formData)
        console.log(res.data);
        return NextResponse.json({'message': res.data.msg, 'data': JSON.stringify(res.data.data)})

      // .then((response) => {
      //   console.log(response.data)
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
      
  } catch (error) {
    console.error("Error in proxy API route:", error);
    return NextResponse.json({ errorData: error});
  }
}
