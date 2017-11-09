const Sequelize = require('sequelize');
const pathLib = require('path');

const mysql = require('../middlewares/sequelize');

const schema = {
  filename: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER(32),
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(64),
    allowNull: false,
    set: function (val) {
      return pathLib.resolve(__dirname, val);
    }
  },
  description: {
    type: Sequelize.STRING(128)
  }
};

const options = {
  underscored: true
};

const File = mysql.define('file', schema, options);

module.exports = File;