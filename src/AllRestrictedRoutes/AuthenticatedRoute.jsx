
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUser } from "../AllContext"

export const AuthenticatedRoute = () => {
    const {funUser, loading, CurrentUserType, banned} = AuthUser();
    useEffect(()=>{
        CurrentUserType()
    },[loading])
    return (
        loading  ? <div>Loading...</div> :
        funUser && !funUser.emailVerified ?  <Navigate to="/verify"/>:
        funUser && funUser.emailVerified && banned !== undefined && banned === true ?  <Navigate to="/banned"/>:
        funUser && funUser.emailVerified ? <Outlet /> :
        <Navigate to="/login"/> 
    )
}