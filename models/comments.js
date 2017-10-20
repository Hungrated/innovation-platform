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

const Comment = mysql.define('comment', schema, options);

const User = require('./users');
const Blog = require('./blogs');

Comment.belongsTo(User, {
    foreignKey: 'student_id'
});

Comment.belongsTo(Blog, {
    foreignKey: 'article_id'
});

Comment.sync().then();

module.exports = Comment;