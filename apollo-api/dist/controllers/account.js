"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const config_app_1 = __importDefault(require("../config.app"));
const response_1 = __importDefault(require("../exception/response"));
function index(req, res) { }
function signIn(req, res) {
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
    }
    catch (error) {
        if (config_app_1.default.devMode && error instanceof Error) {
            (0, response_1.default)(res, 404, error.message);
            return;
        }
        (0, response_1.default)(res);
    }
}
