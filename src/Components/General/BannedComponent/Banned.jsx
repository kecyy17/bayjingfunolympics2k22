import { useNavigate } from "react-router-dom"
import { CustomButton } from "../../General"

import "./Banned.css"
export const Banned = () => {
    const NavigateToPage = useNavigate()
    const HandleExit = (e) => {
        e.preventDefault()
        NavigateToPage("/logout")
    }

    return (
        <>
            <div className="verify-container">
                <div className="form-wrapper">
                    <form className="banned-wrapper" onSubmit={HandleExit}>
                        <h2>You've been banned ! </h2>
                        <p>You've been bannned from using our service because of inappropriate comments.</p>
                        <CustomButton text={"Close"} btnType="Submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}