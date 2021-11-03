import './App.css';
import { TrendingMovies } from './components/TrendingMovies/FetchTrendingMovies';
//import AppOld from './components/SearchOld/App';
//import { SearchMoviesFetch } from './components/Search/SearchMovie';
import MovieList from './components/Search/MovieList'
import {NavLink, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import { MoviesPage } from './pages/Movies/Movies';

function App() {
 
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <NavLink exact to='/' className='navLink' activeClassName='activeNavLink'>Home</NavLink>
          </li>
            <li>
            <NavLink to='/movies' className='navLink' activeClassName='activeNavLink'>Movies</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
      <Route exact path='/' >
        <HomePage title='title from App' />
        <TrendingMovies />
      </Route>
      <Route path='/movies' component={MoviesPage}>
       <MovieList/>
      </Route>
      <Route>
        <p className='error'>404 Page not Found</p>        
      </Route>
      
    </Switch>
        
        
        {/* <SearchMoviesFetch/> */}
        {/* <AppOld/> */}
        

    </div>
  );
}

export default App;
