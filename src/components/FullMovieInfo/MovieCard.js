//import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

//import './FullMovieInfo.module.css'


export default function MovieCard() {
    const history = useHistory();
    const location = useLocation();
    console.log('Card location', location)
    const [details, setDetails] = useState(null);
    const params = useParams();
    const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
    const URL = `https://api.themoviedb.org/3/`;
    const endpoint = `movie/`;
    const getFullInfo = URL + endpoint + `${params.movieId}?api_key=${API_KEY}`;
    
 
    useEffect(() => {
        
        fetch(getFullInfo)
            .then(response => response.json())
            .then(object => setDetails(object))
            .catch((error) => alert(`This is ${error}!`))
        return () => `error`
    }, [getFullInfo],
    console.log('check storage 1',details))
    
   
    const handleClick = () => {
        //alert(`hi!`);
            history.push(location?.state?.from?.location ?? '/');

        //history.push('/movies')
    }
console.log('check storage 2',details)
    return (
        <>
            <button type='button' onClick={handleClick}> { location?.state?.from?.label ?? '← Go back'}</button>
            {details ? (
                <>
                    <article key={details.id}>
                        <img src={details.poster_path} alt='' />
                        <title key={details.id}>{details.title}</title>
                        <p>User Score: {details.vote_average}</p>
                        <title>Overview</title>
                        <p>{details.overview}</p>
                        <title>Genres</title>
                        <p>{details.genres}</p>
                    </article>
                    <div>
                        <p>Additional information</p>
                        <ul>
                            <li>
                                Cast - REFFERENCE
                            </li>
                            <li>
                                Reviews - REFFERENCE
                            </li>
                        </ul>
                    </div>
                </>                 
            ) : (<p>NO match found</p>)}
            </>
            
)
}



