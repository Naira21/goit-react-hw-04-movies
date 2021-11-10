import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import s from './SearchMovie.module.css'
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router';
import { MoviesFetch } from '../APIs';
const newMoviesFetch = new MoviesFetch();


export function SearchMoviesFetch({ searchValue }) {
    const [searchResults, setSearchResults] = useState([]);
    const [status, setStatus] = useState('init');
   
    const location = useLocation();
    const history = useHistory();
    const urlOnSearch = new URLSearchParams(location.search).get("query");
    console.log('urlOnSearch', urlOnSearch);

    useEffect(() => {
        newMoviesFetch.searchQuery = searchValue;
        if (searchValue === "") {
            return;
        };
        
         setStatus("pending");       
                
        newMoviesFetch
            .searchMovie()
            .then((searchResults) => setSearchResults(searchResults), setStatus('success'))
            .catch(() => setStatus('error'))
    }, [searchValue],
        console.log('results in useEffect', searchResults),  
    
    );

    useEffect(() => {
        if (urlOnSearch === '') {
            return;
        }
        if(urlOnSearch){
            newMoviesFetch.searchQuery = urlOnSearch;
        }
        
        newMoviesFetch
            .searchMovie()
            .then((searchResults) => setSearchResults(searchResults), setStatus('success'))
            .catch(() => setStatus('error'))

    }, [urlOnSearch])

   

    //rendering
    
    if (status === "init" || searchValue === "") {
        return null;
    }
    if (status === "success") {
        return (
            <>
                <ul className={s.post}>                    
                    {searchResults.length > 0 && searchResults.map((movie) =>
                    (<li key={movie.id} className={s.item}>
                        <Link to={{
                            pathname: `/movies/${movie.id}`,   //куда?
                            state: {
                                from:  `${history.location.pathname}` + `${history.location.search}`,        //откуда?
                            }   
                        }}
                        >
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