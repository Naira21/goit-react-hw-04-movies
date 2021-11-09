import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './TrendingMovies.module.css'
import { useLocation, NavLink} from 'react-router-dom';
import {MoviesFetch} from '../APIs'

const newMoviesFetch = new MoviesFetch();
export default function TrendingMovies () {
    const [trends, setTrends] = useState([]);
    const [status, setStatus] = useState('init');
    const location = useLocation();


    useEffect(() => {   
              
        newMoviesFetch
            .getTrendingMovies()
            .then(trends =>
                setTrends(trends), setStatus('success')
            )
            .catch((error) => setStatus(error))
    }, [])
    const today = Date.now();
    const newDate= new Date(today)
    let result = newDate.getFullYear() + '/' + (newDate.getMonth()+1) + '/' + newDate.getDate();
    
    return (
        <div className='post'>
            <h1 className="headline"> Trending today, {result }</h1>
            <ul className='list'>
                {trends.length > 0 && trends.map(trend =>
                    
                    <li key={trend.id} className='item'>
                        
                        <NavLink to={{
                            pathname: `/movies/${trend.id}`,
                            state:{from:location, label: "Go to trends"}
                        }}>
                            {trend.name || trend.title} 
                        </NavLink>
                       
                    </li>
                )
                }
            </ul>
            
        </div>
    )

}


TrendingMovies.prototype = {
    media_type: PropTypes.string.isRequired,
    time_window: PropTypes.string.isRequired,
    API_KEY: PropTypes.string.isRequired
}