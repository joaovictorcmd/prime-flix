// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=3d3ead3c05d27f6eb1d604befda8b752

import axios from 'axios';
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;
