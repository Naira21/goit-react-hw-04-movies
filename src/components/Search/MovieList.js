import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchMoviesFetch } from "./SearchMovie";

function MovieList() {
  const [searchValue, setSearchValue] = useState("");


  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={getSearchValue} />
      <SearchMoviesFetch searchValue={searchValue} />
    </div>
  );
}
export default MovieList;
