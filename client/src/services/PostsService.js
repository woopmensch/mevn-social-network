import { HTTP } from './api'

export default {
    async fetchPosts() {
        let resp;

        try {
            resp = await HTTP({
                url: "/posts",
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }

        return resp.data;
    },

    async fetchPostsByUser(userId) {
        let resp;

        try {
            resp = await HTTP({
                url: `/posts/user/${userId}`,
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error)
        }
        console.log(resp)
        return resp.data;
    },

    async fetchLikedPosts(userId) {
        let resp;

        try {
            resp = await HTTP({
                url: `/posts/user/${userId}/liked`,
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }

        return resp.data;
    },

    async createPost(params) {
        let resp;

        try {
            resp = await HTTP({
                url: "/posts/create",
                method: "POST",
                data: params,
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }

        return resp.data;
    },

    async deletePost(postId) {
        try {
            await HTTP({
                url: `/posts/${postId}/delete`,
                method: "DELETE",
                crossdomain: true
            })

        } catch (error) {
            console.log(error);
        }
    },

    // async updatePost(postId, newText) {
    //     try {
    //         await HTTP({
    //             url: `/posts/${postId}/update`,
    //             method: "PUT",
    //             data: { text: newText },
    //             crossdomain: true
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }

    // },

    async likePost(postId) {
        try {
            await HTTP({
                url: `/posts/${postId}/like`,
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }
    },


}