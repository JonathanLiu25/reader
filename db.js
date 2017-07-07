const Sequelize = require("sequelize");
const url = process.env.DATABASE_URL || "postgres://localhost:5432/reader";

const db = new Sequelize(url, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = db;
