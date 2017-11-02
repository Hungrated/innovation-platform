const Sequelize = require('sequelize');
const config = require('config-lite')(__dirname);

const mysql = new Sequelize(config.database.dbName, config.database.username,
  config.database.password, config.database.options);

module.exports = mysql;
