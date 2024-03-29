"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const port = process.env.port || 3000; //การกำหนด environment แต่ถ้าไม่มี ให้ใส่ 3000 
const server = http_1.default.createServer(app_1.app);
server.listen(port, () => {
    console.log("Server is Start");
});
