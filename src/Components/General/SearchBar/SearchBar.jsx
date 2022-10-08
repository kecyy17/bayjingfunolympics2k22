
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
export const SearchBar = ({handleSearch, placeholder}) => {
    return (
        <div className="search-bar-wrapper">
            <div className="search-bar">
                <div>
                    <SearchIcon />
                </div> 
                <input type={"search"} placeholder={placeholder} onChange={handleSearch}/> 
                  
            </div>
        </div>
    )
}