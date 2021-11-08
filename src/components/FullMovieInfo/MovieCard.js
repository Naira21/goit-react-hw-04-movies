//import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link} from 'react-router-dom';
import {MoviesFetch} from '../APIs'

const newMoviesFetch = new MoviesFetch();

export default function MovieCard() {
    const history = useHistory();
    const location = useLocation();
    console.log('Card location', location)
    const [details, setDetails] = useState(null);
    const [castState, setCastState] = useState(false);
    const [cast, setCast] = useState([]);
    const [reviewsState, setReviewsState] = useState(false);
    const [reviews, setReviews] = useState([]);
    const params = useParams();
   
 
    useEffect(() => {
        
        newMoviesFetch
            .getMovieDetails(params.movieId)
            .then(details =>
                setDetails(details)
            )
            .catch((error) => alert(error))
    }, [params.movieId])
    
    
   
    const handleClick = () => {
        //alert(`hi!`);
            history.push(location?.state?.from?.location ?? '/');

        //history.push('/movies')
    }
    console.log('check storage 2', details)
    
            
    useEffect(() => {
        if (castState) {
            newMoviesFetch
            .getCast(params.movieId)
            .then(cast =>
                setCast(cast)
            )
            .catch((error) => alert(error))
        }
        
    }, [castState, params.movieId])
    
    useEffect(() => {
        if (reviewsState) {
          newMoviesFetch
            .getCast(params.movieId)
            .then(cast =>
                setCast(cast)
            )
            .catch((error) => alert(error))  
        }
        
    }, [reviewsState, params.movieId])

    const showReviews=() => {
       setReviewsState(true) 
    }
    const showCast=() => {
       setCastState(true) 
    }
        
        
    return (
        <>
            <button type='button' onClick={handleClick}> { location?.state?.from?.label ?? '← Go back'}</button>
            {details ? (
                <>
                    <p>Details</p>
                    <article key={details.id}>
                        {
                            details.poster_path ? details.poster_path : `No poster`
                        }
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
                            <li onClick={showCast}>
                                
                                {details.cast &&
                                    <Link to={`/movies/${params.movieId}/cast`}>
                                        Cast - REFFERENCE
                                    </Link>
                                }
                            </li>
                            <li onClick={showReviews}>
                                {details.reviews &&
                                    <Link to={`/movies/${params.movieId}/reviews`}>
                                        Reviews - REFFERENCE
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </>                 
            ) : (<p>No match found</p>)}
        </>
            
)
}



