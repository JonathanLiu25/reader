const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/reader", {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = db;
