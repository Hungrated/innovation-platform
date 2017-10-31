/**
 * Created by Zihang Zhang on 2017/10/30.
 */

const Sequelize = require('sequelize');

const mysql = require('../middlewares/sequelize');

const schema = {};

const options = {
  underscored: true
};

const Relationship = mysql.define('relationship', schema, options);

const User = require('./users');

Relationship.belongsTo(User, {
  foreignKey: 'student_id'
});


// Relationship.sync().then();

module.exports = Relationship;


