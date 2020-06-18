import axios from "axios";

export const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : 'https://mevn-social-network.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})
