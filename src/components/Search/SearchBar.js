import { useState, useEffect } from 'react';
import { useLocation, useHistory  } from 'react-router';
import s from './SearchMovie.module.css'

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
    };
   


    return (        
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder='Movie...'
                query={urlOnSearch}
                onChange={handleSearchOnChange}
                className={s.inputStyle}
                value={searchValue}
                />            
            <button type="submit" >Search</button>
        </form>               
    )
}