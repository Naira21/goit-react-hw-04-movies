import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {MoviesFetch} from '../APIs'

const newMoviesFetch = new MoviesFetch();
export default function Reviews() {
    const [reviews, setReviews] = useState(null);
    const params = useParams();
    
    useEffect(() => {        
        newMoviesFetch
        .getReviews(params.movieId)
        .then(reviews =>
            setReviews(reviews)
        )
        .catch((error) => alert(error))  
        
    }, [params.movieId])
  console.log('reviews', reviews)
  
    return reviews.length > 0 ? (
      <ul>
        {reviews.results.map((review) => (
          <li key={review.id} >
            <h3 >Author name: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))
          
        }
            {/* {reviews ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        reviews &&
        reviews.results.map((review) => (
          <li key={review.id} >
            <h3 >Author name: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))
      )} */}
        
      </ul>
            
    ): <p>We don't have any reviews for this movie</p>
}