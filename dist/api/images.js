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
exports.Image = exports.images = void 0;
const express_1 = __importDefault(require("express"));
const sharp = require("sharp");
const images = express_1.default.Router();
exports.images = images;
const glob = require("glob");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTl: 60000 });
images.get("/", (req, res) => {
    var _a, _b, _c;
    const dir = __dirname.split("/").slice(0, -2).join("/") + "/assets";
    const filename = ((_a = req.query.filename) !== null && _a !== void 0 ? _a : undefined);
    const width = ((_b = req.query.width) !== null && _b !== void 0 ? _b : undefined);
    const height = ((_c = req.query.height) !== null && _c !== void 0 ? _c : undefined);
    const queries = [filename, width, height];
    const isUndefined = queries.every((element) => typeof element === "undefined");
    const img = new Image(filename, width, height, `${dir}/full/${filename}`, `${dir}/thump/${width}_${height}_${filename}`, req.url);
    glob(`${dir}/full/*.*`, function (err, files) {
        if (err) {
            img.errorLog(err, res);
        }
        if (!isUndefined && files.includes(img.dirname)) {
            img.processImage(res);
        }
        else if (!isUndefined && !files.includes(img.dirname)) {
            res.send(`${img.filename} is not available`);
        }
        else {
            const names = [];
            let name = "";
            files.forEach(function (el) {
                name = el.split("/").slice(-1);
                names.push(name);
            });
            res.send(`Please enter an image name in the url, example:<br/>http://localhost:3001/api/images<em>?filename=palmtunnel.jpg&width=300&height=200</em>.<br/><br/>available images:<hr/>${names}`);
        }
    });
});
class Image {
    constructor(filename, width, height, dirname, outPutPath, url) {
        this.filename = filename;
        this.width = width;
        this.height = height;
        this.dirname = dirname;
        this.outPutPath = outPutPath;
        this.url = url;
    }
    errorLog(err, res) {
        console.log({
            error: err instanceof Error
                ? err.message
                : "Failed to do something exceptional"
        });
        res.send(err instanceof Error ? err.message : "Failed to do something exceptional");
    }
    processImage(res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`is Image in cache? ${myCache.has(this.url)}`);
            if (myCache.has(this.url)) {
                res.sendFile(myCache.get(this.url));
                return myCache.take(this.url);
            }
            else {
                try {
                    yield sharp(this.dirname)
                        .resize({
                        width: parseInt(this.width),
                        height: parseInt(this.height)
                    })
                        .png()
                        .toFile(this.outPutPath);
                    myCache.set(this.url, this.outPutPath);
                    res.sendFile(this.outPutPath);
                    return this.outPutPath;
                }
                catch (err) {
                    this.errorLog(err, res);
                    return null;
                }
            }
        });
    }
}
exports.Image = Image;
