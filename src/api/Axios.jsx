import axios from 'axios';

//Base url for fetching meals api

export default axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/'
});

