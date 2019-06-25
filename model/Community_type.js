const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
module.exports = sequelize.define('community_types',{
    type_id: { type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    type_name: { type: Sequelize.STRING(100), allownull: false}
});