"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./api/index"); //import router from index and change name to index
const movie_1 = require("./api/movie");
const person_1 = require("./api/person");
const creators_1 = require("./api/creators");
const stars_1 = require("./api/stars");
const search_1 = require("./api/search");
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
// app.use(
//     cors({
//     //   origin: "http://yourapp.com",
//     // origin: "http:localhost:4200",
//     origin: "*", //ใครเข้าก็ได้ เรียกก็ได้
//     })
//   );
exports.app.use(body_parser_1.default.text());
exports.app.use(body_parser_1.default.json());
exports.app.use("/", index_1.router);
exports.app.use("/movie", movie_1.router);
exports.app.use("/person", person_1.router);
exports.app.use("/creators", creators_1.router);
exports.app.use("/stars", stars_1.router);
exports.app.use("/search", search_1.router);
// app.use("/upload", upload);
// app.use("/uploads", express.static("uploads"));
// app.use("/", (req , res)=>{ //req = Request, res = Response
//     res.send("Hello World!!!");
// });
