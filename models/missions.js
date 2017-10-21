/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');

const mysql = require('../libs/sequelize');

const schema = {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

const options = {
  underscored: true
};

const Mission = mysql.define('mission', schema, options);

const User = require('./users');

Mission.belongsTo(User, {
  foreignKey: 'teacher_id'
});

Mission.sync().then();

module.exports = Mission;