import { useState } from 'react';
import { useLocation, useHistory  } from 'react-router';
import './SearchMovie.module.css'


export function SearchBar({onSubmit}) {
    const [searchValue, setSearchValue] = useState("");
    const location = useLocation();
    const history = useHistory();
    const handleSearchOnChange = (e) => {
        setSearchValue(e.target.value);  //toLowerCase()
    };
const urlOnSearch = new URLSearchParams(location.search).get("query");
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchValue);
        setSearchValue('');
        
        if (location.search !== "") {
            return;
        }
        history.push({
            ...location,
            search: `query=${searchValue}`,
        })
    };

   
    return (        
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder='Movie...'
                query={urlOnSearch}
                onChange={handleSearchOnChange}
                />            
            <button type="submit" >Search</button>
        </form>               
    )
}