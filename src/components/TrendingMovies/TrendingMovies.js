import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './TrendingMovies.module.css'
import { Link} from 'react-router-dom';
// import {MoviesFetch} from '../APIs'

// const newMoviesFetch = new MoviesFetch();
export default function TrendingMovies () {
    const [trends, setTrends] = useState([]);
    const [status, setStatus] = useState('init');
    const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
    const URL = `https://api.themoviedb.org/3/`;

    useEffect(() => {   
              
        // newMoviesFetch
        //     .getTrendingMovies()
        //     .then(trends =>
        //         setTrends(trends), setStatus('success')
        //     )
        //     .catch((error) => setStatus(error))
        
        const trendingUrl = `${URL}trending/all/day?api_key=${API_KEY}`;
        fetch(trendingUrl)
            .then(res => res.json(), setStatus('pending'))
            .then(data => setTrends(data.results), setStatus('success'))
            .catch(() => setStatus('error'))
    }, [])
    const today = Date.now();
    const newDate= new Date(today)
    let result = newDate.getFullYear() + '/' + (newDate.getMonth()+1) + '/' + newDate.getDate();
    
    return (
        <>
            <h1 className="headline"> Trending today, {result }</h1>
            <ul>
                {trends.length > 0 && trends.map(trend =>
                    
                    <li key={trend.id} className='trendList'>
                        
                        <Link to={`/movies/${trend.id}`}>
                            {trend.title}
                        </Link>
                       
                    </li>
                )
                }
            </ul>
            
        </>
    )

}




TrendingMovies.prototype = {
    media_type: PropTypes.string.isRequired,
    time_window: PropTypes.string.isRequired,
    API_KEY: PropTypes.string.isRequired
}