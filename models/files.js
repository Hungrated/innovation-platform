/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');

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
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(128)
    }
  }
;

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