import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://naufalbigcat.my.id'
});

export default instance;