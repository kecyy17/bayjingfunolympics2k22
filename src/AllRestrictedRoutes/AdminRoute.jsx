
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUser } from "../AllContext"

export const AdminRoute = () => {
    const {funUser, loading, CurrentUserType, userType} = AuthUser();
    useEffect(()=>{
        CurrentUserType()
    },[loading])
    
    return (
        window.localStorage.getItem('login') && window.localStorage.getItem('login') === "true" ?
            loading || !userType ? <div>Loading...</div> :
            funUser && !funUser.emailVerified ? <Navigate to="/verify"/>:
            funUser && funUser.emailVerified && userType === "admin" ? <Outlet /> :
            funUser && funUser.emailVerified? <Navigate to="/home"/>:
            <Navigate to="/login"/>
            :
            <Navigate to="/login"/>
    )
}