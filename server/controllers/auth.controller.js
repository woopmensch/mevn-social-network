const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.model");
const validate = require("../validation")
const { body, validationResult } = require('express-validator/check');

router.post("/register", validate('register'), register);
router.post("/login", validate('login'), login);

module.exports = router;

async function register(req, res, next) {
    try {
        const { email } = req.body;

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorMessages = errors.array().map((value) => {
                return value.msg
            })
            return res.status(422).send({ error: errorMessages });
        }

        // Check if there is a user with the entered email
        const foundUser = await User.findOne({ "email": email }).exec((err, data) => console.log(err))
        if (foundUser) {
            return res.status(403).send({ error: "email is already in use" });
        }

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });

        await newUser.save();

        return res.status(200).send({
            auth: true,
            user: await newUser.toAuthJSON()
        })

    } catch (error) {
        return res.send(error)
    }
}

async function login(req, res, next) {
    try {

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errorMessages = errors.array().map((value) => {
                return value.msg
            })
            return res.status(422).send({ error: errorMessages });
        }

        return passport.authenticate("local", { session: false }, async (error, user) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                return res.status(300).send({ error: ["Invalid email/password combination"] })
            }

            return res.status(200).send({ user: await user.toAuthJSON() });
        })(req, res, next);

    } catch (error) {
        return res.send(error)
    }
}