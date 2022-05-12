"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./api/routers"));
const logger_1 = require("./helpers/logger");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("main index");
    // res.writeHead(200, {'Content-Type': 'text/html'});
    console.log("main index.ts");
});
app.use("/api", logger_1.logger, routers_1.default);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
const myFunc = (num) => num * 2;
exports.default = myFunc;
