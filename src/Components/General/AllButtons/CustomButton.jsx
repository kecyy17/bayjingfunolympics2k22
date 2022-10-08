import { useNavigate } from 'react-router-dom'
import "./CustomButton.css"
export const CustomButton = ({border, backColor, width, height, text, toPage, btnType}) => {
    const NavigateToPage = useNavigate();
    let btnStyle = {
        backgroundColor: backColor,
        border: border,
        width: width,
        height: height,
    }
    
    return (
        <div className="custom-botton-container">
            <button className="custom-button" 
                style={btnStyle} 
                onClick={()=> toPage? NavigateToPage(toPage): {}}
                type={btnType}
                >
                {text}
            </button>
        </div> 
    )
}