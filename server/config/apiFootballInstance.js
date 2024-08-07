const axios = require(`axios`)

const apiFootballInstance = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v3'
});

module.exports = apiFootballInstance;