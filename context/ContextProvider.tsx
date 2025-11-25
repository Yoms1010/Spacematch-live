import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
    user: {name: "", isSubscribed: ""},
    token: "",
    loading: false,
    errorNotify: "",
    notification: "",
    purchaseitem: "",
    goalPlan: {} as any,
    goalMatches: {} as any,
    terratribeMatches: {} as any,
    setUser: (user: any) => {},
    setToken: (token: any) => {},
    setLoading: () => {},
    setPurchaseitem: () => {},
    setGoalPlan: (data: any) => {},
    setGoalMatches: (data: any) => {},
    setTerratribeMatches: (data: any) => {},
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
    const [goalPlan, _setGoalPlan] = useState<any>()
    const [goalMatches, _setGoalMatches] = useState<any>()
    const [terratribeMatches, _setTerratribeMatches] = useState<any>()
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

    const setGoalMatches = (data: any) => {
        _setGoalMatches(data)
    }
    const setTerratribeMatches = (data: any) => {
        _setTerratribeMatches(data)
    }

    const setGoalPlan = (data: any) => {
        _setGoalPlan(data)
    }

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
            // window.localStorage.setItem('current_user', JSON.stringify(user));
        }else{
            window.localStorage.removeItem('current_user');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            errorNotify,
            goalPlan,
            goalMatches,
            notification,
            terratribeMatches,
            setErrorNotify,
            setGoalPlan,
            setGoalMatches,
            setNotification,
            setTerratribeMatches
         } as any}>

            {children}

        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
