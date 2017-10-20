/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');

const mysql = require('../libs/sequelize');

const schema = {
    teacher_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    rate: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    remark: {
        type: Sequelize.STRING(128)
    }
};

const options = {
    underscored: true
};

const Rate = mysql.define('rate', schema, options);

const User = require('./users');
const Blog = require('./blogs');

Rate.belongsTo(User, {
    foreignKey: 'student_id'
});

Rate.belongsTo(Blog, {
    foreignKey: 'mission_id'
});

Rate.sync().then();

module.exports = Rate;