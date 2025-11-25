'use server'

import axiosClient from "@/axios-server";
import { getToken } from "./user.action";

export const partnershipPreferenceMatches = async (payload: any): Promise<any> => {
  try {
    const apiKey = await getToken();
    const apiEndpoint = `${process.env.BACKEND_DEVELOPMENT_API}/get-partnership-preference-matches/`;

    const { client_id, client_name, property_type, timeline, number_of_rooms, furnishing_status, budget, contribution, lga, state, country, partner_type, shared_values, active } = payload;

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
        client_id,
        client_name,
        property_type,
        timeline,
        number_of_rooms,
        furnishing_status,
        budget,
        contribution,
        lga,
        state,
        country,
        partner_type,
        shared_values,
      })
    };

    // 4. Make the request
    const apiResponse = await fetch(apiEndpoint, options);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      // console.log(errorText);
      return errorText
    }

    const data = await apiResponse.json();
    // 5. Relay the successful response
    return data;

    //   await axiosClient.post(apiEndpoint, payload)
    //   .then((response) => {
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
    //             // return NextResponse.json({errors: JSON.stringify(newErrors)});
    //           }else{
    //             console.log(response.data.msg);
    //           }
    //         }else{

    //         }
    //     })

  } catch (error) {
    console.error("Error in proxy API route:", error);
    return { error: 'An internal server error occurred.' };
  }
}