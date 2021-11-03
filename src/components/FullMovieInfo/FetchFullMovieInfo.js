import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
//import './FullMovieInfo.module.css'


export function FullMovieInfo({choosenMovie}) {
    
       const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
    const URL = `https://api.themoviedb.org/3/`;
    const endpoint = `movie/`;
   const  getFullInfo= URL + endpoint + `${choosenMovie}?api_key=${API_KEY}`;

    useEffect(() => {
      
   
        console.log('request:', getFullInfo);
        fetch(getFullInfo)
            .then(response =>response.json()
            //console.log('response:', response)
        )            
            .catch((error) => alert(`This is ${error}!`))
    }, [getFullInfo])
    

    return (
            
                    <>
                        {/* <div>
                            <img src={movieInfo.poster_path} alt='' />
                            <title key={movieInfo.id}>{movieInfo.title}</title>
                            <p>User Score: {movieInfo.vote_average}</p>
                            <title>Overview</title>
                            <p>{movieInfo.overview}</p>
                            <title>Genres</title>
                            <p>{ }</p>                        
                        </div>
                        
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
                        {/* <div>Results</div> */}
                        </>
             

       
    )

}



