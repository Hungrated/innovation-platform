const Sequelize = require('sequelize');

const mysql = require('../middlewares/sequelize');

const schema = {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_time: {
    type: Sequelize.STRING(16),
    allowNull: false
  },
  deadline: {
    type: Sequelize.STRING(16),
    allowNull: false
  },
  rate: {
    type: Sequelize.STRING(8)
  },
  remark: {
    type: Sequelize.STRING(128)
  }
};

const options = {
  underscored: true
};

const Plan = mysql.define('plan', schema, options);

module.exports = Plan;