import { useState } from "react";


function Searchbar({ onSubmit }) {
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

    <form className="SearchForm" onSubmit={handleSearchSubmit}>
      <button type="submit" >
        Search
      </button>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        value={searchValue}
        placeholder="Search images and photos"
        onChange={handleSearchOnChange}
      />
    </form>

  );
}

export default Searchbar;
