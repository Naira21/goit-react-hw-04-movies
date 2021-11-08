//import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import {Link} from 'react-router-dom';
import {MoviesFetch} from '../APIs'

const newMoviesFetch = new MoviesFetch();

export default function MovieCard() {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    console.log('Card location', location)
    const [details, setDetails] = useState(null);
    const [castState, setCastState] = useState(false);
    const [cast, setCast] = useState(null);
    const [reviewsState, setReviewsState] = useState(false);
    const [reviews, setReviews] = useState(null);
   
 
    useEffect(() => {
        newMoviesFetch
            .getMovieDetails(params.movieId)
            .then(setDetails)
            .catch((error) => alert(error))
    }, [params.movieId],
        console.log('details', details));
    
    const handleClick = () => {
        history.push(location?.state?.from?.location ?? '/');
    }
    
    
            
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
            .then(reviews =>
                setReviews(reviews)
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
                            details.poster_path ? <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} alt='' /> : `No poster`
                        }
                        
                        <h1 key={details.id}>{details.title}</h1>
                        <h2>User Score: {details.vote_average}</h2>
                        <h2>Overview</h2>
                        <p>{details.overview}</p>
                        <h2>Genres</h2>
                        {/* {<ul>{details.genres.map((genre)=><li>{genre.name}</li>)} </ul> } */}
                    </article>
                    <div>
                        <p>Additional information</p>
                        <ul>
                            <li onClick={showCast}>
                                
                                {details.cast &&
                                    <Link to={{
                                    pathname: `/movies/${params.movieId}/cast`,
                                    state: { from: location?.state?.from ?? "/movies" },
                                }
                                    }>
                                        Cast
                                    </Link>
                                }
                            </li>
                            <li onClick={showReviews}>
                                {details.reviews &&
                                    <Link to={{
                                    pathname: `/movies/${params.movieId}/reviews`,
                                    state: { from: location?.state?.from ?? "/movies" },
                                }}>
                                        Reviews 
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


