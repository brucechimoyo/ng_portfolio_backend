const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("portfolio", "root", "#password@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
