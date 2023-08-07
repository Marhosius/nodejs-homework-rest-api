import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import gravatar from "gravatar"

import User from "../models/user.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = await gravatar.url(email, { s: '250', r: 'x' }, true);
    console.log('avatarURL', avatarURL)
    const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword });

    res.status(201).json({
        email: newUser.email,
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
    })
}

const getCurrent = (req, res) => {
    const { subscription, email } = req.user;

    res.json({
        email,
        subscription
    })
}

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "Signout success"
    })
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    if (!req.file) throw HttpError(400, "Bad Request");
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);
    console.log(avatarURL)
    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    if (!result) throw HttpError(404, "Not found");

    res.json(result.avatarURL);
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateAvatar: ctrlWrapper(updateAvatar),
}