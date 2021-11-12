import { lazy, Suspense, useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import {Link, Route} from 'react-router-dom';
import { MoviesFetch } from '../APIs'
import s from './MovieCard.module.css'

const CastInfo = lazy(() => import('./Cast'/* webpackChunkName: "cast info"*/))
const Reviews = lazy(()=>import('./Reviews'/* webpackChunkName: "reviews"*/  ))

const newMoviesFetch = new MoviesFetch();

export default function MovieCard() {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const [details, setDetails] = useState(null);
 
 
    useEffect(() => {
        newMoviesFetch
            .getMovieDetails(params.movieId)
            .then(setDetails)
            .catch((error) => alert(error))
    }, [params.movieId],
    );
    
  const handleClick = () => {
    history.push(location?.state?.from ?? '/');
    }
  
  return (
    <>
      <button type='button' onClick={handleClick}>
        ← Go back
      </button>
      {details ? (
        <>
          <article key={details.id}>
            {
              details.poster_path ?
                <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} alt='' />
                : `No poster`
            }
            <div className={s.main}>
              <h1 key={details.id}>{details.name || details.title}</h1>
              <h2>User Score: {details.vote_average}</h2>
              <h2>Overview</h2>
              <p>{details.overview}</p>
              <h2>Genres</h2>
              {<ul className={s.genres}>{
                details.genres && details.genres.map((genre) => (
                  <li key={genre.id} className={s.genre}>
                    {genre.name}
                  </li>))}
              </ul>
              }
            </div>
          </article>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={{
                  pathname: `/movies/${details.id}/cast`,                    
                  state: {
                    from: history.location.state.from,
                    label: "Go back to movie details",
                  },
                }}>
                  Cast
                </Link>
              </li>
              <li >
                <Link to={{
                  pathname: `/movies/${details.id}/reviews`,
                  state: {
                    from: history.location.state.from,
                    label: "Go back to movie details",
                  },
                }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback="Waiting...">
            <Route path='/movies/:movieId/cast' component={CastInfo}></Route>
            <Route path='/movies/:movieId/reviews' component={Reviews}></Route>
          </Suspense>
        </>
        ) : (<p>No match found</p>)}
    </>    
  )
}



