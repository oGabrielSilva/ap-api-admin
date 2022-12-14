"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO)
    .then(() => app.emit('db'))
    .catch((e) => console.log('Mongoose connect error', e.message));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(router_1.default);
app.on('db', () => app.listen(process.env.PORT, () => console.log(`Server on: http://127.0.0.1:${process.env.PORT}`)));
