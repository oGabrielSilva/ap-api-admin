"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exception(res, status = 404, message = 'Oopss...some mistake happened') {
    return res.status(status).json({ message, status });
}
exports.default = exception;
