import axios from 'axios';

const API_KEY = `607ce2b0175f11dd3da1b6bcb0605f59`;
const URL = `https://api.themoviedb.org/3/`;

export class MoviesFetch{
    constructor() {
        this.state_url= URL;
        this._searchQuery = '';
    }
    get searchQuery() {
        return this._searchQuery;
    }
    set searchQuery(value) {
        return (this._searchQuery = value);
    }

    async getTrendingMovies() {
        axios.defaults.baseURL = this.state_url;
        let url = `trending/all/day?api_key=${API_KEY}`;
        try {
            const response = await axios.get(url);
            const data = response.data.results;
            return data;
        }
        catch (err) {
            return err.message
        }
    
    }

    async searchMovie() {
        if (!this.searchQuery) {
            return;
        }
        let url = `search/movie?api_key=${API_KEY}&query=${this.searchQuery}`;
        
        try {
            const response = await axios.get(url);
            const data = response.data.results;
            return data;
        }
        catch (err) {
            return err.message
        }

    }

    async getMovieDetails(id) {
        let url = `movie/${id}?api_key=${API_KEY}&language=en-US`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            return data;
        }
        catch (err) {
            return err.message;
        }        
    }


    async getCast(id) {
        let url = `movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
        try {
            const response = await axios.get(url);
            const data = response.data.cast;
            return data;
        }
        catch (err) {
            return err.message;
        }        
    }

      async getReviews(id) {
        let url = `movie/${id}/reviews?api_key=${API_KEY}&language=en-US`;
        try {
            const response = await axios.get(url);
            const data = response.data; //возможно, нужно response.data
            return data;
        }
        catch (err) {
            return err.message;
        }        
    }
}


//или просто функциями записывать export function nameFunction(){return axios.get(url).then()}