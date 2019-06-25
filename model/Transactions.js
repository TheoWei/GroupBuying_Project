const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;
const User = require('./User');
const Group = require('./Group');
const Transaction = sequelize.define('group_transaction',{
    tx_id: { type: Sequelize.INTEGER(11), allownull: false, autoIncrement: true, primaryKey: true},
    group_id: { type: Sequelize.INTEGER(11), allownull: false},
    user_id: { type: Sequelize.INTEGER(11), allownull: false},
    shop_list: { type: Sequelize.STRING, allownull: false},
    total_amount: { type: Sequelize.FLOAT(10,2).UNSIGNED, allownull: false}    
});

User.hasMany(Group, {foreignKey: 'user_id'});
Group.hasMany(Group, {foreignKey: 'group_id'});
Transaction.belongsTo(User, {foreignKey: 'user_id'});
Transaction.belongsTo(Group, {foreignKey: 'group_id'});

module.exports = Transaction;