import {
    HTTP
} from './api';
import store from '@/store';

export default {
    async fetchUserById(id) {
        let resp;

        try {
            resp = await HTTP({
                url: `/users/${id}`,
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }

        return resp.data;
    },

    async updateUserInfo(data) {
        let resp;

        try {
            resp = await HTTP({
                url: `/users/current/update`,
                method: "PUT",
                crossdomain: true,
                data: data
            })

            store.dispatch('saveUserData', resp.data.user);
        } catch (error) {
            console.log(error);
        }

        return resp.data;
    }
}