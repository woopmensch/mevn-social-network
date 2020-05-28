const express = require('express');
const passport = require('passport');
const Post = require('../models/post.model');
const router = express.Router();
const io = require('../socketio');
const auth = {};
auth.required = passport.authenticate('jwt', { session: false });

router.post('/create', auth.required, create);
router.get('/', auth.required, getAll);
router.get('/user/:id', auth.required, getByUser);
router.get('/user/:id/liked', auth.required, getLiked)
router.delete('/:id/delete', auth.required, _delete);
// router.put('/:id/update', auth.required, _update);
router.get('/:id/like', auth.required, like);

module.exports = router;

async function create(req, res, next) {
    try {
        const postParam = req.body;

        if (!postParam.text || !postParam.text.trim()) {
            return res.send("string is empty")
        }

        const post = new Post({
            user: req.user._id,
            text: postParam.text
        })

        await post.save();

        io.emit('newPost', JSON.stringify(await post.getDetailedInfo()));

        res.json(post);

    } catch (error) {
        res.send(error);
    }
}

async function getAll(req, res, next) {
    try {
        const posts = await Post.find().sort({ created: -1 });


        for (let i = 0; i < posts.length; i++) {

            await posts[i].getDetailedInfo();
        }

        res.send(posts);

    } catch (error) {
        res.send(error);
    }
}

async function getByUser(req, res, next) {
    try {
        const userId = req.params.id;
        const posts = await Post.find({ user: userId }).sort({ created: -1 });

        for (let i = 0; i < posts.length; i++) {
            await posts[i].getDetailedInfo();
        }
        console.log(posts)
        res.send(posts);

    } catch (error) {
        res.send(error);
    }
}

async function getLiked(req, res, next) {
    try {
        const userId = req.params.id
        const posts = await Post.find({ likes: userId }).sort({ created: -1 });
        for (let i = 0; i < posts.length; i++) {
            await posts[i].getDetailedInfo();
        }

        res.send(posts);

    } catch (error) {
        res.send(error)
    }
}

async function _delete(req, res, next) {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (JSON.stringify(post.user._id) != JSON.stringify(req.user._id)) {
            return res.status(401).send("user not authorized");
        }

        await Post.findByIdAndDelete(postId);

        io.emit("deletePost", postId)

        res.send({ success: true })

    } catch (error) {
        res.send(error);
    }
}

// async function _update(req, res, next) {
//     try {
//         const postId = req.params.id;
//         const post = await Post.findById(postId);
//         const postParam = req.body;
//         if (!post) {
//             res.send("post not found");
//         }
//         if (JSON.stringify(post.user) != JSON.stringify(req.user._id)) {
//             return res.status(401).json({ msg: 'user not authorized' });
//         }

//         // copy userParam properties to user
//         Object.assign(post, postParam);

//         await post.save();

//         io.emit("updatePost", await post.getDetailedInfo())

//         res.send("post saved");

//     } catch (error) {
//         res.send(error);
//     }
// }

async function like(req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user._id;

        await post.toggleLike(userId);
        await post.getDetailedInfo();

        io.emit("togglePostLike", { targetPost: post._id, likes: await post.likes })

        res.send({ success: true })
    } catch (error) {
        res.send(error)
    }
}