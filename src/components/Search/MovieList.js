import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchMoviesFetch } from "./SearchMovie";
import { useLocation, useHistory } from 'react-router';


function MovieList() {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const location = useLocation();
  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);
 };

  
    
  
// const pushPath = () => {
//     history.push({
//       ...location,
//       search: `query=${searchValue}`,
//     });
  //   };
  //onClick = { pushPath } in SearchBar
  return (
    <div className="App">
      <SearchBar onSubmit={getSearchValue}  />  
      <SearchMoviesFetch searchValue={searchValue} />
    </div>
  );
}
export default MovieList;


//const urlQuery = new URLSearchParams(location.search).get("query")
//const location = useLocation();
//const history = useHistory();
//import { useLocation, useHistory } from "react-router-dom";