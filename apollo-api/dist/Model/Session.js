"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const genUid = () => `${(0, uuid_1.v4)()}-${(0, uuid_1.v4)()}`;
const sessionSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    uid: { type: String, default: genUid },
}, { timestamps: true });
const Session = (0, mongoose_1.model)('Session', sessionSchema);
exports.default = Session;
