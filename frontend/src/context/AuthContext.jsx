import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const getUserFromLocalStorage=()=>{
        // console.log(localStorage.getItem("user"))
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    }
    const [currentUser,setCurrentUser]=useState(getUserFromLocalStorage);

      
       const updateUser=(data)=>{
           setCurrentUser(data);
       }
   
       useEffect(()=>{
           try {
            localStorage.setItem("user",JSON.stringify(currentUser));
           } catch (error) {
            console.error("Error saving user to localStorage:", error);
           }
       },[currentUser])
       

    return (
    <AuthContext.Provider value={{currentUser,updateUser}}>
        {children}
    </AuthContext.Provider>
    );
}