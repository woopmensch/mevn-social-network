const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    target: {
        model: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
})

CommentSchema.methods.toggleLike = async function (userId) {
    let comment = this
    if (comment.likes.includes(userId)) {
        comment.likes.splice(comment.likes.indexOf(userId), 1)
    } else {
        comment.likes.push(userId)
    }

    await comment.save()

    return comment
}

CommentSchema.methods.getDetailedInfo = function () {
    let comment = this;
    let opts = [{
        path: 'user',
        select: '_id name avatar'
    }, {
        path: 'likes',
        select: '_id name avatar'
    }]

    return comment.populate(opts).execPopulate()
}

module.exports = mongoose.model('Comment', CommentSchema)
