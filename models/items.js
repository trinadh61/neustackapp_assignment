
const items = (sequelize, DataTypes) => {
    return sequelize.define( 'items' , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        price : DataTypes.INTEGER,
        name : DataTypes.STRING,
    }, {
        tableName : "items"
    });
}

module.exports = items