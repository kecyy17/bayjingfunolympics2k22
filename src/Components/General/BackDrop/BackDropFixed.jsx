import "./BackDrop.css"
export const BackDropFixed = ({show, handleClick, children}) => {
    return (
        <div className={`backdrop-wrapper ${show ?`showBD`: `hideBD`}`} onClick={handleClick}>
            {children}
        </div>
    )
}