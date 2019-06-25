const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const User = require('./User');
const Group = sequelize.define('community_group',{
    group_id: { type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    commuinty_id: { type: Sequelize.INTEGER(11), allownull: false},
    group_name: { type: Sequelize.STRING, allownull: false},
    group_owner: { type: Sequelize.INTEGER(11), allownull: false},
    group_members: { type: Sequelize.STRING, allownull: false}
});

// User.hasMany(Group, {foreignKey: 'user_id'});
// Group.belongsTo(User, {foreignKey: 'group_owner'});

module.exports = Group;