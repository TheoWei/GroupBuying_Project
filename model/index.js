const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const config = require('../config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
})
mongoose.connect(config.mongodb, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

module.exports = {
    sequelize, 
    mongo: mongoose.connection
}

