"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    lastLogin: { type: Date, default: Date.now },
    active: { type: Boolean, default: false },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
