import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './SearchMovie.module.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
//import MovieCard  from '../FullMovieInfo/MovieCard'

//import { SearchBar } from './SearchBar'
//import { FullMovieInfo } from '../FullMovieInfo/FetchFullMovieInfo';

import { MoviesFetch } from '../APIs';
const newMoviesFetch = new MoviesFetch();


// const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
// const URL = `https://api.themoviedb.org/3/`;
//     const endpoint = `search/`;
//     const source = `movie?`;


export function SearchMoviesFetch({ searchValue }) {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [status, setStatus] = useState('init');
    
    
    useEffect(() => {
        newMoviesFetch.searchQuery = searchValue;
        if (searchValue === "") {
            return;
        }
        setStatus("pending");
        
        newMoviesFetch
            .searchMovie()
            .then((searchResults) => setSearchResults(searchResults), setStatus('success'))
            .catch(() => setStatus('error'))
    }, [searchValue],
        console.log('results in useEffect',searchResults),
    );
   
    console.log('results out of useEffect',searchResults);
    if (status === "init") {
        return null;
    }
    if (status === "success") {
        return (
            <>
                <ul>                    
                    {searchResults.length > 0 && searchResults.map((movie) =>
                         (<li key={movie.id} className='result-item'>
                            <Link to={{
                                pathname: `/movies/${movie.id}`,   //куда?
                                state: {
                                    from: { location, label: `← Go back`, }   //откуда?
                                }
                            }}>
                                {movie.title}
                            </Link>
                        </li>)
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