"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/**

* middleware for all routes
* @param req - Request object.
* @params res - Response object.
* @params next - Passes control to the next matching route.
* @returns void.

*/
function logger(req, res, next) {
    const url = req.url;
    console.log(`${url} was visited`);
    next();
}
exports.logger = logger;
