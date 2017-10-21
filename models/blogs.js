/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const Sequelize = require('sequelize');

const mysql = require('../libs/sequelize');

const schema = {
  type: {
    type: Sequelize.ENUM,
    values: ['project', 'event'],
    allowNull: false
  },
  title: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(128)
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cover_url: {
    type: Sequelize.STRING(64)
  },
  photo_url: {
    type: Sequelize.STRING
  }
};

const options = {
  underscored: true
};

const Blog = mysql.define('blog', schema, options);

const User = require('./users');

Blog.belongsTo(User, {
  foreignKey: 'author_id'
});

Blog.sync().then();

module.exports = Blog;
