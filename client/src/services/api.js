import axios from "axios";

export const HTTP = axios.create({
    // baseURL: 'https://mevn-social-network.herokuapp.com/api',
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})
