/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');
const config = require('config-lite')(__dirname).database;

const mysql = new Sequelize(config.dbName, config.username, config.password, config.options);

module.exports = mysql;

function abc(req,res,next) {


}