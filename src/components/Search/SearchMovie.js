import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './SearchMovie.module.css'
import { Link, Route } from 'react-router-dom';
import {FullMovieInfo}  from '../FullMovieInfo/FetchFullMovieInfo'

//import { SearchBar } from './SearchBar'
//import { FullMovieInfo } from '../FullMovieInfo/FetchFullMovieInfo';

const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
    const URL = `https://api.themoviedb.org/3/`;
    const endpoint = `search/`;
    const source = `movie?`;

    
export function SearchMoviesFetch({searchValue}) {

    const [searchResults, setSearchResults] = useState([])
    const [status, setStatus] = useState('init');
    
    
    useEffect(() => {
        if (searchValue === "") {
            return;
        }

        setStatus("pending");
        const searchMovie = URL + endpoint + source + `api_key=${API_KEY}&query=${searchValue}`;
        
        //console.log(searchMovie);
        fetch(searchMovie)
            .then(result => result.json())
            .then(data => setSearchResults(data.results), setStatus('success'))
            .catch(() => setStatus('error'))
    }, [searchValue]
    )

    // const [movieId, setMovieId] = useState('');
 
    // useEffect(() => {
    //     const onClickListItem = () => {
    //         setMovieId(searchResults.id);
    //     }
    //     const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
    //     const URL = `https://api.themoviedb.org/3/`;
    //     const endpoint = `movie/`;
    //     const getFullInfo = URL + endpoint + `${movieId}?api_key=${API_KEY}`;
    //     console.log('request:', getFullInfo);
    //     fetch(getFullInfo)
    //         .then(response => response.json(), onClickListItem())
    //         .then(data => setMovieId(data))
    //         .catch((error) => alert(`This is ${error}!`))
    // }, []);

   
    if (status === "init") {
    return null;
    }
    if (status === "success") {
        return (
            <>
                {/* <SearchBar onSubmit={getSearchValue} /> */}
                <ul>
                    {searchResults.map(movie =>
                   
                        <li key={movie.id} className='result-item'>
                            <Link to='/movies/'>
                                {movie.title}
                            </Link>
                            <Route path="/movies/">
                                <FullMovieInfo choosenMovie={movie.id} />
                            </Route>
                            
                            <div>
                                <img src={movie.poster_path} alt='' />
                                {/* <title key={movie.id}>{movie.title}</title> */}
                                <p>User Score: {movie.vote_average}</p>
                                <p>Overview</p>
                                <p>{movie.overview}</p>
                                <p>Genres</p>
                                <p>{movie.genres}</p>

                                
                            </div>
                        
                        </li>
                    )}
                </ul>
            </>
        )
    }
    if (status === "error") {
    if (searchResults.length === 0) {
      return alert(`Sorry, we couldn't find a movie with this word... Lets try again!`);
    }
  }
}

SearchMoviesFetch.prototype = {
    queryResults: PropTypes.arrayOf(PropTypes.shape),
    API_KEY: PropTypes.string.isRequired
}