
import { useState } from "react"
import "./BackDrop.css"
export const BackDrop = ({children, banned}) => {
    const [showBD, setShowBD] = useState(true)
    const HandleBackDrop = () => {
        setShowBD(false)
    }
    return (
        <div className={`backdrop-wrapper ${showBD && !banned ? `showBD`: `hideBD`}`} onClick={HandleBackDrop}>
            {children}
        </div>
    )
}