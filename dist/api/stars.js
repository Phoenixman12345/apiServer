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
        res.send("Method GET in stars.ts with " + id + " : " + name + " this is query params ");
        // res.send(`Method GET in trip.ts with ${id} ${name}`);
        // res.send("Method GET in trip.ts with "+ name +" this is query params ");
    }
    else {
        // res.send("Method GET in trip.ts");
        // const sql = "select stars.sid,stars.name,  from stars INNER JOIN person AS person_star ON stars.pidS = person_star.pid" +
        // "INNER JOIN creators ON movie.mid = creators.midC" +
        // "INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid";
        const sql = `SELECT stars.sid, person_star.pid, person_star.name as star_name ,movie.mid , movie.name as movie_name
        FROM stars
        INNER JOIN movie ON  stars.midS = movie.mid
        INNER JOIN person AS person_star ON stars.pidS = person_star.pid
        INNER JOIN creators ON movie.mid = creators.midC
        INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid`;
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
    let sql = "INSERT INTO `stars`(`pidS`,`midS`) VALUES (?,?)";
    sql = mysql_1.default.format(sql, [
        movie.pidS,
        movie.midS
    ]);
    dbconnect_1.conn.query(sql, (err, result) => {
        if (err)
            throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});
exports.router.delete("/:id", (req, res) => {
    let id = req.params.id;
    dbconnect_1.conn.query("delete from stars where sid = ?", [id], (err, result) => {
        if (err)
            throw err;
        res
            .status(200)
            .json({ affected_row: result.affectedRows });
    });
});
