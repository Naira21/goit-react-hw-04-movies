import PropTypes from 'prop-types';
import { useState } from 'react'
import { useLocation } from 'react-router'
import s from './SearchMovie.module.css'

export function SearchBar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const handleSearchOnChange = (e) => {
    setSearchValue(e.target.value);
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
        placeholder="Movie..."
        query={urlOnSearch}
        onChange={handleSearchOnChange}
        className={s.inputStyle}
        value={searchValue}
      />
      <button type="submit">Search</button>
    </form>
  )
}

SearchBar.prototype = {
  onSubmit: PropTypes.func,
}