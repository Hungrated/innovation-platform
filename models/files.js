/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');

const mysql = require('../libs/sequelize');

const schema = {
  description: {
    type: Sequelize.STRING(128)
  },
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
    allowNull: false
  }
};

const options = {
  underscored: true
};

const File = mysql.define('file', schema, options);

const User = require('./users');

File.belongsTo(User, {
  foreignKey: 'uploader_id'
});

File.sync().then();

module.exports = File;