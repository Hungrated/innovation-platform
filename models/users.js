/**
 * Created by Zihang Zhang on 2017/10/17.
 */
const config = require('config-lite')(__dirname).database;

const Sequelize = require('sequelize');

const mysql = require('../libs/sequelize');

const crypto = require('crypto');

const schema = {
    username: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(256),
        allowNull: false,
        set(val){ // 对val加密并返回加密值
            const hash = crypto.createHash('sha256');
            hash.update(config.salt + val);
            const hashedPWD = hash.digest('hex');
            this.setDataValue('password', hashedPWD.slice(0, 255));
        }
    },
    identity: {
        type: Sequelize.ENUM,
        values: ['student', 'teacher', 'superAdmin'],
        allowNull: false
    },
    // isLogin: {
    //     type: Sequelize.ENUM,
    //     values: ['true', 'false']
    // }
};

const options = {
    indexes: [
        {
            unique: true,
            fields: ['username']
        }
    ],
    underscored: true
};

const User = mysql.define('user', schema, options);

User.sync().then();

module.exports = User;
