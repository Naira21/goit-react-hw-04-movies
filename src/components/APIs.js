import axios from 'axios';

const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
const URL = `https://api.themoviedb.org/3/`;

export class MoviesFetch{
    constructor() {
        // this.state_url= URL;
        // this.api_key = API_KEY;
        this._searchQuery = '';
    }
    get searchQuery() {
        return this._searchQuery;
    }
    set searchQuery(value) {
        return (this._searchQuery = value);
    }

    async getTrendingMovies() {
        // axios.defaults.baseURL = this.state_url;
        // axios.defaults.headers.common.Authorization = this.api_key;
        let url = `${URL}trending/all/day?api_key=${API_KEY}`;
        try {
            const response = await axios.get(url);
            const data = response.data.results;
            if (response.status === 400)
                throw new Error();
            if (response.status === 200)
                return data;
        }
        catch (error) {
            return error.message;
        }
    }

    async searchMovie(searchQuery) {
        let url = `${URL}search/movie?api_key=${API_KEY}&query=${searchQuery}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (response.status === 400)
                throw new Error();
            if (response.status === 200)
                return data;
        }
        catch (error) {
            return error.message;
        }
    }



}

// export async function TrendingMoviesFetch() {
//     return fetch(`${URL}trending/all/day?api_key=${API_KEY}`)
//         .then(res => res.json())
//         .then(data => data.results)
//         .catch(() => new Error('No movies on trend...Sorry'))
// }

// export async function SearchMovieFetch(searchValue) {
//     return fetch(`${URL}search/movie?api_key=${API_KEY}&query=${searchValue}`)
//         .then(res => res.json())
//         .then(data => data.results)
//         .catch(() => new Error('No such movie found'))
// }

//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false