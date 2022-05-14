"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = require("./images");
const routers = express_1.default.Router();
routers.get("/", (req, res) => {
    res.send("routers api");
    console.log("routers api");
});
routers.use("/images", images_1.images);
exports.default = routers;
