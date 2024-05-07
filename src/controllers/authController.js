const asyncHandle = require("express-async-handler");
const UserModel = require("../models/userModels");
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getJsonWebToken = async (email, id) => {
    const payload = {
        email,
        id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });

    return token;
};

const register = asyncHandle(async (req, res) => {
    const { email, fullName, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error('User has already exist!!!');
    }

    const salt = await bcryp.genSalt(10);
    const hashedPassword = await bcryp.hash(password, salt);

    const newUser = new UserModel({
        email,
        fullName: fullName ?? '',
        password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
        message: 'Register new user successfully',
        data: {
            email: newUser.email,
            id: newUser.id,
            accesstoken: await getJsonWebToken(email, newUser.id),
        },
    });
});

module.exports = { register }