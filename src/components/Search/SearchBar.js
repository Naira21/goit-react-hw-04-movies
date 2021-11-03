import { useState } from 'react';
import './SearchMovie.module.css'


export function SearchBar({onSubmit}) {
    const [searchValue, setSearchValue] = useState("");

    
    const handleSearchOnChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchValue);
        setSearchValue("");
    };
    
    return (        
        <form onSubmit={handleSearchSubmit}>
            <input placeholder='Movie...' onChange={handleSearchOnChange}/>
            
            <button type="submit" >Search</button>
        </form>       
        
    )

}