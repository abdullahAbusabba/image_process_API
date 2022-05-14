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
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../index");
const glob = require("glob");
const request = (0, supertest_1.default)(index_1.app);
describe("Test first endpoint response ", () => {
    it("gets / response with status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
});
describe("Test invalid endpoint ", () => {
    it("should return 404 status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/test");
        expect(response.status).toBe(404);
    }));
});
describe("Testing a valid endpoint /api", () => {
    it("should return 200 status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api");
        expect(response.status).toBe(200);
    }));
});
describe("Testing a valid endpoint /api/images", () => {
    it("should return 200 status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images");
        expect(response.status).toBe(200);
    }));
});
describe("Testing an endpoint with queries set and image processing", () => {
    it("should return 200 status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=fjord.jpg&width=300&height=200");
        expect(response.status).toBe(200);
    }));
    it("should return true for finding the new image in the folder", () => __awaiter(void 0, void 0, void 0, function* () {
        glob(path_1.default.join(__dirname, "..", "..", "assets", "thump", "*.*"), function (err, files) {
            expect(files.includes(path_1.default.join(__dirname, "..", "..", "assets", "thump", "300_200_fjord.jpg"))).toBe(true);
        });
    }));
});
