"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAsync = exports.conn = void 0;
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
exports.conn = mysql_1.default.createPool({
    connectionLimit: 10,
    // host: "202.28.34.197",
    // host: "localhost",
    // user : "tripbooking",
    // password : "tripbooking@csmsu",
    // database : "tripbooking"
    host: "202.28.34.197",
    user: "web66_65011212216",
    password: "65011212216@csmsu",
    database: "web66_65011212216"
});
exports.queryAsync = util_1.default.promisify(exports.conn.query).bind(exports.conn);
