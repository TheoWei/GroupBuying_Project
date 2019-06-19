const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
module.exports = sequelize.define('user',{
    user_id: {type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true },
    user_email: {type: Sequelize.STRING(50), allownull: false},
    user_password: {type: Sequelize.STRING(200), allownull: false},
    user_username: {type: Sequelize.STRING(100), allownull: false, defaultValue: ""}, //default
    user_phone: {type: Sequelize.INTEGER(11).UNSIGNED, allownull: false, defaultValue: 0}, //default
    user_address: {type: Sequelize.STRING(200), allownull: false, defaultValue: ""}, //default
});