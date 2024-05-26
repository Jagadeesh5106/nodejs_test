const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  username: "root",
  password: "jagadeesh99",
  database: "nodejs-test-project",
  host: 'localhost',
  dialect:'mysql'
});

module.exports = sequelize;
