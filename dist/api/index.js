"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router(); // router = ตัวจัดการเส้นทาง;
exports.router.get("/", (req, res) => {
    res.send("Method GET in index.ts");
});
