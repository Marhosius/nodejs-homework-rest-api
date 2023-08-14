import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";

import User from "../models/user.js";

import { HttpError, emailSender } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";
import { nanoid } from "nanoid";

const { JWT_SECRET, BASE_SERVER_URL } = process.env;

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = await gravatar.url(email, { s: '250', r: 'x' }, true);
    const verificationToken = nanoid()
    const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_SERVER_URL}/api/users/verify/${verificationToken}" target="_blank">Click verify email</a>`
    }

    await emailSender(verifyEmail);

    res.status(201).json({
        email: newUser.email,
    })
}

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, "User not found")
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.json({
        message: "Verification successful"
    })
}

const verifyResend = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "User not found")
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_SERVER_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
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

    if (!user.verify) {
        throw HttpError(401, "Verification required");
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

    Jimp.read(oldPath).then((image) => {
        image.resize(250, 250);
    })
        .catch((err) => {
            console.log('jimp', err)
        });
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
    verify: ctrlWrapper(verify),
    verifyResend: ctrlWrapper(verifyResend),
}