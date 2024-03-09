"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("../dbconnect");
const mysql_1 = __importDefault(require("mysql"));
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    if (req.query.id) { //TRIP?ID=XXXXX
        const id = req.query.id;
        const name = req.query.name;
        res.send("Method GET in person.ts with " + id + " : " + name + " this is query params ");
        // res.send(`Method GET in trip.ts with ${id} ${name}`);
        // res.send("Method GET in trip.ts with "+ name +" this is query params ");
    }
    else {
        // res.send("Method GET in trip.ts");
        const sql = "select * from person";
        dbconnect_1.conn.query(sql, (err, result) => {
            if (err) { //check error
                res.status(400).json(err);
            }
            else {
                res.json(result);
            }
        });
    }
});
exports.router.post("/", (req, res) => {
    let movie = req.body;
    let sql = "INSERT INTO `person`(`name`, `information`, `profileImage`, `age`) VALUES (?,?,?,?)";
    sql = mysql_1.default.format(sql, [
        movie.name,
        movie.information,
        movie.profileImage,
        movie.age
    ]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
exports.router.delete("/:id", (req, res) => {
    let id = req.params.id;
    dbconnect_1.conn.query("delete from person where pid = ?", [id], (err, result) => {
        if (err)
            throw err;
        res
            .status(200)
            .json({ affected_row: result.affectedRows });
    });
});
