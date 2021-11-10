import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import s from "./SearchMovie.module.css";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";
import { MoviesFetch } from "../APIs";
const newMoviesFetch = new MoviesFetch();

export function SearchMoviesFetch({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("init");

  const location = useLocation();
  const history = useHistory();
  const urlOnSearch = new URLSearchParams(location.search).get("query");
  // console.log("urlOnSearch", urlOnSearch);

  //исходный useEffect(), по которому рендерится разметка
    
  // useEffect(() => {
  //   if (searchValue === "") {
  //     return;
  //   }

  //   newMoviesFetch.searchQuery = searchValue;
  //   setStatus("pending");

  //   newMoviesFetch
  //     .searchMovie()
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res);
  //     })
  //     .catch((error) => setStatus("error", error.message));
  // }, [searchValue]);

    //проверка работы useEffect-ов
  useEffect(
    () => {
      console.log("1st useeffect");
      if (searchValue === "") {
        return;
      }
      newMoviesFetch.searchQuery = searchValue;

      setStatus("pending");

      newMoviesFetch
        .searchMovie()
        .then((results) => {
          setSearchResults(results);
          setStatus("success");
        })
        .catch((error) => setStatus("error", error.message));
    },
    [searchValue]
    // console.log("results in useEffect", searchResults)
  );

  useEffect(() => {
    console.log("2nd useEffect");
    console.log(status);
    if (urlOnSearch === "") {
      return;
    }
    if (urlOnSearch) {
      newMoviesFetch.searchQuery = urlOnSearch;
      const query = newMoviesFetch.searchQuery;
      console.log(query);
    }

    setStatus("pending");

    newMoviesFetch
      .searchMovie()
      .then((results) => {
        setSearchResults(results);
        setStatus("success");
      })
      .catch((error) => setStatus("error", error.message));
  }, [urlOnSearch]);

    
    
  //rendering
  if (status === "pending") {
    return <div className="">Загружаю</div>;
  }

  if (status === "init" || searchValue === "") {
    return null;
  }
  if (status === "success") {
    return (
      <>
        <ul className={s.post}>
          {searchResults.map((movie) => {
            return (
              <li key={movie.id} className={s.item}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`, //куда?
                    state: {
                      from:
                        `${history.location.pathname}` +
                        `${history.location.search}`, //откуда?
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
  if (status === "error") {
    if (searchResults.length === 0) {
      return alert(
        `Sorry, we couldn't find a movie with this word... Lets try again!`
      );
    }
  }
}

SearchMoviesFetch.prototype = {
  queryResults: PropTypes.arrayOf(PropTypes.shape),
  API_KEY: PropTypes.string.isRequired,
};
