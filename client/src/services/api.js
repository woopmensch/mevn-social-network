import axios from "axios";

export const HTTP = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})
