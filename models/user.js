const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be provided'],
        validate: {
            validator: async function (value) {
                const user = await this.constructor.findOne({ username: value });
                return !user;
            },
            message: 'Username must be unique'
        }
    },
    email: {
        type: String,
        required: [true, 'Email must be provided'],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            `Incorrect email`
        ],
        validate: {
            validator: async function (value) {
                const user = await this.constructor.findOne({ email: value });
                return !user;
            },
            message: 'Email must be unique'
        }
    },

    password: {
        type: String,
        required: [true, 'Password must be provided'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            `Incorrect password`
        ]
    }
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema)