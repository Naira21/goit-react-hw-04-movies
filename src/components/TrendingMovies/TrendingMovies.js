import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import s from './TrendingMovies.module.css'
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
        <div className={s.post}>
            <h1 className={s.headline}> Trending today, {result }</h1>
            <ul className={s.list}>
                {trends.length > 0 && trends.map(trend =>
                    
                    <li key={trend.id} className={s.item}>
                        
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
    API_KEY: PropTypes.string.isRequired
}