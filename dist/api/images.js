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
const express_1 = __importDefault(require("express"));
const sharp = require("sharp");
const images = express_1.default.Router();
const glob = require("glob");
images.get("/", (req, res) => {
    var _a, _b, _c;
    res.status(200);
    const dir = __dirname.split("/").slice(0, -2).join("/") + "/assets";
    const filename = ((_a = req.query.filename) !== null && _a !== void 0 ? _a : undefined);
    const width = ((_b = req.query.width) !== null && _b !== void 0 ? _b : undefined);
    const height = ((_c = req.query.height) !== null && _c !== void 0 ? _c : undefined);
    const img = new Image(filename, width, height, `${dir}/full/${filename}`, `${dir}/thump/process_${filename}`);
    const queries = [
        img.filename,
        img.width,
        img.height
    ];
    const isUndefined = queries.every((element) => typeof element === "undefined");
    glob(`${dir}/full/*.*`, function (err, files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log({
                    error: err instanceof Error
                        ? err.message
                        : "Failed to do something exceptional"
                });
            }
            if (!isUndefined && files.includes(img.dirname)) {
                try {
                    yield sharp(img.dirname)
                        .resize({
                        width: parseInt(img.width),
                        height: parseInt(img.height)
                    })
                        .png()
                        .toFile(img.outPutPath);
                    res.sendFile(img.outPutPath);
                }
                catch (err) {
                    console.log({
                        error: err instanceof Error
                            ? err.message
                            : "Failed to do something exceptional"
                    });
                }
            }
            else if (!isUndefined && !files.includes(img.dirname)) {
                res.send(`${img.filename} is not available`);
            }
        });
    });
});
class Image {
    constructor(filename, width, height, dirname, outPutPath) {
        this.filename = filename;
        this.width = width;
        this.height = height;
        this.dirname = dirname;
        this.outPutPath = outPutPath;
    }
}
exports.default = images;
