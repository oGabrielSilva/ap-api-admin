"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../controllers/account"));
const router = express_1.default.Router();
router.get('/', (req, res) => res.json({ hello: 'apollo' }));
router.post('/account/signin', account_1.default.signIn);
router.post('/account/signup', account_1.default.signUp);
exports.default = router;
