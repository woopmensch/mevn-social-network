const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

PostSchema.methods.toggleLike = async function (userId) {
    let post = this;

    if (post.likes.includes(userId)) {
        post.likes.splice(post.likes.indexOf(userId), 1)
    } else {
        post.likes.push(userId)
    }

    await post.save()

    return post
}

PostSchema.methods.getDetailedInfo = function () {
    let post = this;

    let opts = [{
        path: 'user',
        select: '_id name avatar'
    }, {
        path: 'likes',
        select: '_id name avatar'
    }]

    return post.populate(opts).execPopulate()
}


const PostModel = mongoose.model('Posts', PostSchema);

module.exports = PostModel;