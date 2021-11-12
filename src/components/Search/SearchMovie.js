import { useState, useEffect } from "react";
import s from "./SearchMovie.module.css";
import { Link } from "react-router-dom";
import { useLocation} from "react-router";
import { MoviesFetch } from "../APIs";

const newMoviesFetch = new MoviesFetch();

export function SearchMoviesFetch({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("init");

  const location = useLocation();
  const urlOnSearch = new URLSearchParams(location.search).get("query");

  useEffect(
    () => {
      if (searchValue === "") {
        return;
      }
      newMoviesFetch.searchQuery = searchValue;      
      setStatus("pending");
      newMoviesFetch
        .searchMovie()
        .then(
          // (results) => {
          //   console.log('results', results)
          // setSearchResults(results);
          setStatus("success")
          // }
        )
        .catch((error) => setStatus("error", error.message));
    },
    [searchValue]

  );

  useEffect(() => {    
    if (urlOnSearch === null) {
      return;
    }

    if (urlOnSearch !== null ) {
      newMoviesFetch.searchQuery = urlOnSearch;
      newMoviesFetch
        .searchMovie(urlOnSearch)
        .then((results) => {
          setSearchResults(results);
          setStatus("success");
        })
        .catch((error) => setStatus("error", error.message));
    }    
  }, [urlOnSearch])

  //rendering
  if (status === "init" || searchValue === "") {
    return null;
  }

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "success") {
    return (
      <>
        <ul className={s.post}>
          {searchResults.length > 0 && searchResults.map((movie) => {
            return (
              <li key={movie.id} className={s.item}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                      from: { ...location }
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  if (status === 'error' && searchResults.length === 0) {
    alert(`Sorry, we couldn't find a movie with this word... Lets try again!`);
    return null;
  }
}
