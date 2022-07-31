"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const config_app_1 = __importDefault(require("../config.app"));
const response_1 = __importDefault(require("../exception/response"));
const User_1 = __importDefault(require("../Model/User"));
const session_1 = __importDefault(require("./session"));
const salt = bcryptjs_1.default.genSaltSync();
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!validator_1.default.isEmail(body.email)) {
                (0, response_1.default)(res, 400, 'email provided is inválid');
                return;
            }
            if (body.password.length < 8) {
                (0, response_1.default)(res, 400, 'provided password is too small');
                return;
            }
            const userByEmail = yield User_1.default.findOne({ email: body.email });
            if (!userByEmail) {
                (0, response_1.default)(res, 400, 'email not found');
                return;
            }
            if (!bcryptjs_1.default.compareSync(body.password, userByEmail.password)) {
                (0, response_1.default)(res, 400, 'password entered is incorrect');
                return;
            }
            userByEmail.lastLogin = new Date();
            yield userByEmail.save();
            const session = yield (0, session_1.default)(userByEmail._id);
            res.status(200).json({
                session: { uid: session.uid },
                user: { name: userByEmail.name, email: userByEmail.email },
            });
        }
        catch (error) {
            if (config_app_1.default.devMode && error instanceof Error) {
                (0, response_1.default)(res, 404, error.message);
                return;
            }
            (0, response_1.default)(res);
        }
    });
}
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!validator_1.default.isEmail(body.email)) {
                (0, response_1.default)(res, 400, 'email provided is inválid');
                return;
            }
            if (body.password.length < 8) {
                (0, response_1.default)(res, 400, 'provided password is too small');
                return;
            }
            if (body.name.length < 2 || body.lastname.length < 2) {
                (0, response_1.default)(res, 400, 'provided name or last name is too small');
                return;
            }
            const { email, lastname, name } = body;
            const password = bcryptjs_1.default.hashSync(body.password, salt);
            const userByEmail = yield User_1.default.findOne({ email });
            if (!userByEmail) {
                (0, response_1.default)(res, 400, 'provided email is already in use');
                return;
            }
            const user = yield User_1.default.create({ name, lastname, email, password });
            const session = yield (0, session_1.default)(user._id);
            res
                .status(200)
                .json({ session: { uid: session.uid }, user: { name: user.name, email: user.email } });
        }
        catch (error) {
            if (config_app_1.default.devMode && error instanceof Error) {
                (0, response_1.default)(res, 404, error.message);
                return;
            }
            (0, response_1.default)(res);
        }
    });
}
const account = { signUp, signIn };
exports.default = account;
