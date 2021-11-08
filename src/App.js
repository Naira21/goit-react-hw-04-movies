import './App.css';
import {NavLink, Route, Switch } from 'react-router-dom';
import { lazy, Suspense} from 'react';


const TrendingMovies=lazy(()=>import('./components/TrendingMovies/TrendingMovies'/* webpackChunkName: trending movies*/ ))
const MovieList = lazy(() => import('./components/Search/MovieList' /* webpackChunkName: movies list*/))
const MovieCard = lazy(() => import('./components/FullMovieInfo/MovieCard' /* webpackChunkName: movie card*/ ))
const CastInfo = lazy(() => import('./components/FullMovieInfo/Cast'/* webpackChunkName: cast info*/))
//const Reviews =lazy(()=>import('./components/FullMovieInfo/Reviews'/* webpackChunkName: reviews*/  ))

function App() {
 
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <NavLink exact to='/' className='navLink' activeClassName='activeNavLink'>Home</NavLink>
          </li>
            <li>
            <NavLink exact to='/movies' className='navLink' activeClassName='activeNavLink'>Movies</NavLink>
          </li>
        </ul>
      </nav>
      
      <Suspense fallback={<h1>Waiting...just a second</h1>}>
        <Switch>
          <Route exact path='/' >
            <TrendingMovies />
          </Route>
          <Route exact path='/movies'>
            <MovieList />
          </Route>
          <Route path='/movies/:movieId' component={MovieCard}></Route>          
          <Route path='/movies/:movieId/cast' component={CastInfo}></Route>
          {/* <Route path='/movies/:movieId/reviews' component={Reviews}></Route> */}
          <Route>
            <p className='error'>404 Page not Found</p>        
          </Route>          
        </Switch>
    </Suspense>
        
       

    </div>
  );
}

export default App;
