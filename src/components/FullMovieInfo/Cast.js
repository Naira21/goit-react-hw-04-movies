import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MoviesFetch } from '../APIs'
import defaultImage from '../../defaultImage/defaultImage.png'
import './MovieCard.module.css'

const newMoviesFetch = new MoviesFetch();

export default function CastInfo() {
    const [cast, setCast] = useState(null);
    const params = useParams(); //or just const { moviesId } = useParams();
     useEffect(() => {        
        newMoviesFetch
        .getCast(params.movieId)
        .then(cast =>
            setCast(cast)
        )
        .catch((error) => alert(error))        
        
    }, [params.movieId])

    return (
        
        <ul>
            {cast && cast.map((actor) => (
                <li key={actor.cast_id} className='actor'>
                    <img src={actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : defaultImage} alt='' width="80" />
                    <p>{ actor.name}</p>
                </li>
            ))}
        </ul>
    )
}