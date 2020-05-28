import axios from "axios";

export const HTTP = axios.create({
    baseURL: 'https://mevn-social-network.herokuapp.com/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})
