import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { SearchMoviesFetch } from "./SearchMovie";
import { useLocation, useHistory } from "react-router";

function MovieList() {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const location = useLocation();
  
  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);

    if (searchValue === "") {
      return history.push.location;
    }
    history.push({
      ...location,
      search: `query=${searchValue}`,
    });
  };
  
  useEffect(() => {
    if (location.search === '') {
      return;
    }
    if (location.search !== '') {
      setSearchValue(location.search);
    }
  }, [location.search])

  return (
    <div className="App">
      <SearchBar onSubmit={getSearchValue} />
      <SearchMoviesFetch searchValue={searchValue} />
    </div>
  );
}
export default MovieList;
