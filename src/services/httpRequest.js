import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: "http://localhost:4001/"
});