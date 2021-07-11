// From ucd-sac-fsf-pt-03-2021-u-c/14-MVC/01-Activities/28-Stu_Mini-Project

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

process.env.DB_NAME = 'carbcounter_db'
process.env.DB_USER = 'root'
process.env.DB_PASSWORD = 'word123'

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;