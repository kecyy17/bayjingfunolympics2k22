import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUser } from "../AllContext"

export const BannedRoute = () => {
    const {funUser, loading, CurrentUserType, banned} = AuthUser();
    useEffect(()=>{
        CurrentUserType()
    },[loading])
    return (
        window.localStorage.getItem('login') && window.localStorage.getItem('login') === "true" ?
            loading || banned === undefined ? <div>Loading...</div> :
            funUser && funUser.emailVerified && banned !== undefined && banned === true ?  <Outlet />:
            funUser && funUser.emailVerified? <Navigate to="/home"/>:
            <Navigate to="/"/>
            :
            <Navigate to="/"/>
    )
}