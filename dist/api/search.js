"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("../dbconnect");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    const name = req.query.name;
    // Check if query parameters exist
    if (name) {
        // Handle search based on query parameters
        // You can customize this based on your search logic
        // const sql = "SELECT * FROM movie WHERE name LIKE ?";
        // const sql = "SELECT movie.name, movie.year, movie.detail, movie.star, movie.poster, person.name AS star_name, person.name AS creator_name" +
        //     " FROM movie " +
        //     "INNER JOIN stars ON movie.mid = stars.midS " +
        //     "INNER JOIN creators ON movie.mid = creators.midC " +
        //     "INNER JOIN person ON stars.pidS = person.pid " +
        //     "WHERE movie.name LIKE ?";
        //const sql = "SELECT movie.name, movie.year, movie.detail, movie.star, movie.poster, star_person.name AS star_name,star_person.information as star_infor , creator_person.name AS creator_name, creator_person.information as creator_infor  FROM movie INNER JOIN stars ON movie.mid = stars.midS INNER JOIN person AS star_person ON stars.pidS = star_person.pid INNER JOIN creators ON movie.mid = creators.midC INNER JOIN person AS creator_person ON creators.pidC = creator_person.pid WHERE movie.name LIKE ?";
        //const sql = "SELECT movie.name, movie.year, movie.detail, GROUP_CONCAT(star_person.name SEPARATOR ', ') AS stars, GROUP_CONCAT(creator_person.name SEPARATOR ', ') AS creators FROM movie INNER JOIN stars ON movie.mid = stars.midS INNER JOIN person AS star_person ON stars.pidS = star_person.pid INNER JOIN creators ON movie.mid = creators.midC INNER JOIN person AS creator_person ON creators.pidC = creator_person.pid WHERE movie.name LIKE ? GROUP BY movie.name;";
        //const sql = "SELECT movie.name, movie.year, movie.detail, star_person.name, creator_person.name FROM movie INNER JOIN stars ON movie.mid = stars.midS INNER JOIN person AS star_person ON stars.pidS = star_person.pid INNER JOIN creators ON movie.mid = creators.midC INNER JOIN person AS creator_person ON creators.pidC = creator_person.pid WHERE movie.name LIKE ?;";
        //   const sql = "SELECT movie.name, movie.year, movie.detail ," +
        //   "GROUP_CONCAT(person_star.name SEPARATOR ', ') AS stars ," +
        //   "GROUP_CONCAT(person_creator.name SEPARATOR ', ') AS creators" +
        // "FROM movie "+
        // "INNER JOIN stars ON movie.mid = stars.midS " +
        // "INNER JOIN person AS person_star ON stars.pidS = person_star.pid " +
        // "INNER JOIN creators ON movie.mid = creators.midC "+
        // "INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid"+
        // "WHERE movie.name LIKE ?"+
        // "GROUP BY movie.mid";
        //     const sql = "SELECT movie.name, movie.year, movie.detail , movie.star, movie.poster, person_star.name, person_creator.name" +
        // "FROM movie"+
        // "INNER JOIN stars ON movie.mid = stars.midS" +
        // "INNER JOIN person AS person_star ON stars.pidS = person_star.pid" +
        // "INNER JOIN creators ON movie.mid = creators.midC"+
        // "INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid"+
        // "WHERE movie.name LIKE ?";
        //   const sql = `
        //   SELECT movie.mid, movie.name, movie.year, movie.detail, movie.poster,
        //   person_creator.name AS creator,
        //   GROUP_CONCAT(person_star.name SEPARATOR ', ') AS stars,
        //   GROUP_CONCAT(person_creator.name SEPARATOR ', ') AS creators
        // FROM movie
        // INNER JOIN stars ON movie.mid = stars.midS
        // INNER JOIN person AS person_star ON stars.pidS = person_star.pid
        // INNER JOIN creators ON movie.mid = creators.midC
        // INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid
        // WHERE movie.name LIKE ?
        // GROUP BY movie.mid`;
        const sql = `
SELECT movie.mid, movie.name, movie.year, movie.detail, movie.poster,
       GROUP_CONCAT(person_star.name SEPARATOR ', ') AS stars,
       GROUP_CONCAT(person_creator.name SEPARATOR ', ') AS creators
FROM movie
INNER JOIN stars ON movie.mid = stars.midS
INNER JOIN person AS person_star ON stars.pidS = person_star.pid
INNER JOIN creators ON movie.mid = creators.midC
INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid
WHERE movie.name LIKE ?
GROUP BY movie.mid, person_creator.name; 
`;
        dbconnect_1.conn.query(sql, [`%${name}%`], (err, result) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(result);
            }
        });
    }
    else {
        // If no query parameters, return all movies
        const sql = "SELECT * FROM movie";
        dbconnect_1.conn.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(result);
            }
        });
    }
});
