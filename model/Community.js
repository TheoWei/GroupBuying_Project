const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const Type = require('./Community_type');
const Community = sequelize.define('community',{
    community_id: {type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    community_name: {type: Sequelize.STRING(500), allownull: false},
    type_id: {type: Sequelize.INTEGER(11), allownull: false}
});

Type.hasMany(Community , {foreignKey: 'type_id'});
Community.belongsTo(Type, {foreignKey: 'type_id'});

module.exports = Community;