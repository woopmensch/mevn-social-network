import axios from "axios";

export const HTTP = axios.create({
    baseURL: 'zopa:1337',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})
