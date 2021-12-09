
const config = require('../configuration/config')
const { Sequelize, DataTypes} = require('sequelize');
var sequelizeTransforms = require('sequelize-transforms');
 

const sequelize = new Sequelize(config.get('mysql.database'),config.get('mysql.username'),config.get('mysql.password'),config.get('mysql'));

sequelizeTransforms(sequelize)

sequelize.authenticate()
    .then(() => {
        console.log("My SQL Database Connection is established Successfully.");
    }).catch(err => {
        console.log("error" + err);
    })


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('../models/RegisterSchema')(sequelize, DataTypes);
db.Book = require('../models/bookListSchema')(sequelize, DataTypes);
db.otp  = require('../models/otpSchema')(sequelize, DataTypes);
db.userbook =  require('../models/user_book_schema')(sequelize, DataTypes);


db.Book.hasMany(db.userbook);
db.userbook.belongsTo(db.Book);

db.User.hasMany(db.userbook)
db.userbook.belongsTo(db.User)
module.exports = db;
