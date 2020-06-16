const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');
const io = require('../socketio');

const auth = {};
auth.required = passport.authenticate('jwt', {
    session: false
});

router.get('/', auth.required, getAll);
router.get('/current', auth.required, getCurrent);
router.get('/:id', auth.required, getById);
router.put('/current/update', auth.required, update);
router.delete('/current/delete', auth.required, _delete);

module.exports = router;

async function getAll(req, res, next) {
    try {
        res.send(await User.find());
    } catch (error) {
        res.send(error);
    }
}

async function getCurrent(req, res, next) {
    try {
        res.send(req.user);
    } catch (error) {
        return res.send(error);
    }
}

async function getById(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({
                error: "user not found"
            });
        }

        res.send(await user.getInfo());
    } catch (error) {
        res.send(error);
    }
}

async function update(req, res, next) {
    try {
        const id = req.user._id;
        const userParam = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.send("user not found");
        }

        //validate
        if (user.email !== userParam.email && await User.findOne({
            email: userParam.email
        })) {
            return res.status(401).send('email "' + userParam.email + '" is already taken');
        }


        // copy userParam properties to user
        Object.assign(user, userParam);

        await user.save();

        res.send(await user.getInfo());
    } catch (error) {
        res.send(error);
    }

}

async function _delete(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.user._id;

        if (id != userId) {
            return res.status(401).send("user not authorized");
        }

        await User.findByIdAndRemove(id);

        res.send("user deleted");
    } catch (error) {
        res.send(error);
    }
}