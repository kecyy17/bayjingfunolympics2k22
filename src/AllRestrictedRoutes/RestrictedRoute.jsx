import { Navigate, Outlet } from "react-router-dom";
import { AuthUser } from "../AllContext"

export const RestrictedRoute = () => {
    const {funUser, loading} = AuthUser();

    return (
        loading ? <div>Loading...</div> :
        funUser && !funUser.emailVerified ? <Navigate to="/verify"/>:
        funUser && funUser.emailVerified? <Navigate to="/home"/>:
        <Outlet />
    )
}