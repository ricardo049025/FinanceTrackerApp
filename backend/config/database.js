const Sequelize = require('sequelize');
const { DBNAME} = require('../constants/apiConsts');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `./${DBNAME}.sqlite`, // Path to your SQLite database file
});

module.exports = sequelize;
