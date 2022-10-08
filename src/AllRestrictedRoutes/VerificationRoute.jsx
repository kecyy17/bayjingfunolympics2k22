import { Navigate, Outlet } from "react-router-dom";
import { AuthUser } from "../AllContext"

export const VerificationRoute = () => {
    const {funUser, loading} = AuthUser();
    return (
        loading? <div>Loading...</div> :
        funUser && !funUser.emailVerified ? <Outlet />:
        funUser && funUser.emailVerified? <Navigate to="/home"/>:
        <Navigate to="/"/>
    )
}