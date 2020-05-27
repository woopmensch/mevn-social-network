import { HTTP } from '../services/api';

const setAuthToken = token => {
    if (token) {
        // Apply to every axios request
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Delete Auth Header
        delete HTTP.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;
