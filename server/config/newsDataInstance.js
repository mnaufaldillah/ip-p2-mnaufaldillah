import axios from 'axios';

const newsDataInstance = axios.create({
    baseURL: 'https://newsdata.io/api/1'
});

module.exports = newsDataInstance;