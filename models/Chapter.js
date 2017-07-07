const { STRING, INTEGER } = require("sequelize");
const db = require("../db.js");

const Chapter = db.define("chapter", {
  name: STRING,
  chapter: INTEGER
});

module.exports = Chapter;
