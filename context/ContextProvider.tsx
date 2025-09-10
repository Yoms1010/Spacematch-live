import { axiosClient } from "@/axios-server";
import React, { createContext, useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";

const StateContext = createContext({
    user: {name: "", isSubscribed: ""},
    token: "",
    loading: false,
    errorNotify: "",
    notification: "",
    purchaseitem: "",
    setUser: (user: any) => {},
    setToken: (token: any) => {},
    setLoading: () => {},
    setPurchaseitem: () => {},
    setErrorNotify: (errorNotify: string) => {},
    setNotification: (notification: any) => {}
});


export const ContextProvider = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [user, _setUser] = useState<any>(typeof window !== "undefined" && JSON.parse(window.localStorage.getItem('current_user')!) || "");
    const [notification, _setNotification] = useState("");
    const [errorNotify, _setErrorNotify] = useState("");
    const [purchaseItem, _setPurchaseitem] = useState("")
    const [token, _setToken] = useState(typeof window !== "undefined" && window.localStorage.getItem('ACCESS_TOKEN') || "");


    const setNotification = (message : string) => {
        _setNotification(message)
        setTimeout(() => {
           _setNotification('')
        }, 7000)
    }

    const setErrorNotify = (message: string) => {
        _setErrorNotify(message)
        setTimeout(() => {
           _setErrorNotify('')
        },7000)
    }

    // const setPurchaseitem = () => {
    //     const studio = localStorage("")
    //     _setPurchaseitem()
    // }

    const setToken = (token: any) => {
        _setToken(token)

        if(token){
            window.localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            window.localStorage.removeItem('ACCESS_TOKEN');
        }
    }


    const setUser = (user: any) => {
        _setUser(user)

        if(user){
            window.localStorage.setItem('current_user', JSON.stringify(user));
        }else{
            window.localStorage.removeItem('current_user');
        }
    }

    // useEffect(() => {
    //    const getCurrentUser = async () => {
    //     const user = await axiosClient.get("/user")

    //     _setUser(user)
    //    }

    //    getCurrentUser()
    // }, [])


    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            errorNotify,
            notification,
            setErrorNotify,
            setNotification
         }}>

            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
