

import "./SelectComponent.css"
export const SelectComponent = ({label, defaultValue, className, optData, handleOnChange }) => {
    
    return (
        <div className={`${className} upload-select-container`}>
            <label>{label}</label>
            <select className="upload-select" value={defaultValue} onChange={handleOnChange}>
                {   
                    optData ?
                        optData.map((opt, idx) => {
                            return (
                                <option key={idx} value={opt.optValue}>{opt.optName}</option>
                            )
                        })
                        :
                        <option value="none">None</option>
                }
            </select>
            
        </div>
    )
}