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

const Plan = mysql.define('plan', schema, options);

const User = require('./users');

Plan.belongsTo(User, {
  foreignKey: 'student_id'
});

Plan.sync().then();

module.exports = Plan;