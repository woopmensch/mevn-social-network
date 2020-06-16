const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model');
const passport = require('passport');
const Post = require('../models/post.model');
const io = require('../socketio');

const auth = {};
auth.required = passport.authenticate('jwt', { session: false });

router.get('/posts/:id/comments', auth.required, fetch)
router.post('/posts/:id/comments/create', auth.required, create);
router.post('/comments/:id/like', auth.required, like);
router.delete('/comments/:id/delete', auth.required, _delete);
// router.put('/comments/:id/update', auth.required, update);

module.exports = router;

async function fetch(req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        let comments = [];

        for (let i = 0; i < post.comments.length; i++) {
            let comment = await Comment.findById(post.comments[i]);
            comments.unshift(await comment.getDetailedInfo());
        }

        res.send(comments);

    } catch (error) {
        res.send(error)
    }
}

async function create(req, res, next) {
    try {
        const commentParam = req.body;
        if (!commentParam.text || !commentParam.text.trim()) {
            return res.send({ error: "string is empty" })
        };

        let targetPost = await Post.findById(req.params.id);

        const comment = new Comment({
            text: commentParam.text,
            user: req.user._id,
            target: {
                model: 'Post',
                id: req.params.id
            }
        });

        await comment.save();


        targetPost.comments.unshift(comment._id);

        await targetPost.save()

        io.emit("newComment", { post: await targetPost.getDetailedInfo(), comment: await comment.getDetailedInfo() })

    } catch (error) {
        res.send(error);
    }

}

async function like(req, res, next) {
    try {
        const comment = await Comment.findById(req.params.id);
        const userId = req.user._id

        await comment.toggleLike(userId);
        await comment.getDetailedInfo();

        io.emit("toggleCommentLike", { targetPost: comment.target.id, targetComment: comment._id, likes: await comment.likes })

        res.send({ success: true })
    } catch (error) {
        res.send(error)
    }
}

async function _delete(req, res, next) {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (JSON.stringify(comment.user._id) != JSON.stringify(req.user._id)) {
            return res.status(401).send("user not authorized");
        }

        await Comment.findByIdAndDelete(commentId);

        const post = await Post.findById(comment.target.id);
        post.comments.splice(post.comments.indexOf(commentId), 1);
        await post.save();

        io.emit("deleteComment", { targetPost: await post.getDetailedInfo(), targetComment: commentId });

        res.send({ success: true })

    } catch (error) {
        res.send(error);
    }
}

// async function update(req, res, next) {
//     try {
//         const commentId = req.params.id;
//         const comment = await Comment.findById(commentId);
//         const commentParam = req.body;

//         if (!comment) {
//             res.send("comment not found");
//         }

//         if (comment.user != req.user._id) {
//             return res.status(401).json({ msg: 'user not authorized' });
//         }

//         // copy userParam properties to user
//         Object.assign(comment, commentParam);

//         await comment.save();

//         res.send("comment saved");

//     } catch (error) {
//         res.send(error);
//     }
// }