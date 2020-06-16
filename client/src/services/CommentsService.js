import { HTTP } from './api'

export default {
    async fetchComments(postId) {
        let resp;

        try {
            resp = await HTTP({
                url: `/posts/${postId}/comments`,
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }

        return resp.data;
    },

    async addComment(postId, params) {
        try {
            await HTTP({
                url: `/posts/${postId}/comments/create`,
                method: "POST",
                data: params,
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }
    },

    async deleteComment(commentId) {
        try {
            await HTTP({
                url: `/comments/${commentId}/delete`,
                method: "DELETE",
                crossdomain: true
            })

        } catch (error) {
            console.log(error);
        }
    },

    async likeComment(commentId) {
        try {
            await HTTP({
                url: `/comments/${commentId}/like`,
                method: "GET",
                crossdomain: true
            })
        } catch (error) {
            console.log(error);
        }
    },
}