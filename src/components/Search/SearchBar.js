import { useState } from 'react';
import './SearchMovie.module.css'


export function SearchBar({onSubmit}) {
    const [searchValue, setSearchValue] = useState("");
    
    const handleSearchOnChange = (e) => {
        setSearchValue(e.target.value);  //toLowerCase()
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchValue);
        setSearchValue('');
        //API request with then/catch
    };
    
    return (        
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder='Movie...'
                value={searchValue}
                onChange={handleSearchOnChange}
                />            
            <button type="submit" >Search</button>
        </form>               
    )
}