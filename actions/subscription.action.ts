import axiosClient from "@/axios-client"
import { redirect } from "next/navigation";

declare interface SubscriptionPayloadProps {
    clientId: any;
    clientSubId: number;
    title: string;
    cost: string;
    txRef: string;
    transactionId: number;
    paymentOption: string;
    status: string;
}

export const getCurrentUser = async () => {
    axiosClient.get(`/user`)
    .then((data) => {
        // console.log(data);
        
        return data?.data;
    })
    .catch(err => {
        return err
    })
}


export const onSignOut = () => {
    axiosClient.get("/logout")
    .then((data) => {
      console.log(data);
      typeof window && window.localStorage.removeItem('ACCESS_TOKEN');
      redirect("/sign-in")
    })
    .catch(err => console.log(err));
}


export const clientSubscription = async ({payLoad}: {payLoad: SubscriptionPayloadProps}) => {
    axiosClient.post(`/client-subscription`, payLoad)
    .then((data) => {
        return data;
    })
    .catch(err => {
        return err
    })
}