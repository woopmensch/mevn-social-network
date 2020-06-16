const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_config = require('../config/jwt_config');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, select: false },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    status: { type: String },
    avatar: { type: String, default: "AL" }
});

UserSchema.pre('save', async function (next) {
    if (this.password !== '' && this.isModified('password')) {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;

        next()
    } else {
        next()
    }
})

UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

UserSchema.methods.generateJWT = async function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    const payload = {
        email: this.email,
        _id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }

    return await jwt.sign(payload, jwt_config.secret);
}

UserSchema.methods.toAuthJSON = async function () {
    return await {
        _id: this._id,
        email: this.email,
        name: this.name,
        token: await this.generateJWT()
    };
};

UserSchema.methods.getInfo = async function () {
    return this
}


UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);