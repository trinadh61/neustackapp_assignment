const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('../config/config.json')['db_config'];

let db = {};
const filename = path.basename(__filename);

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname).filter(file => 
    file.indexOf('.') != 0 && file.slice(-3) === '.js' && file !== filename
).forEach(file => {
    const modelname = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[modelname.name] = modelname;

})

console.log(db)

module.exports = db;