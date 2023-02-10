


const orders = (sequelize, DataTypes) => {
    return sequelize.define('orders', {
        id  : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        status : {
            type : DataTypes.ENUM("success", "cancelled"),
            allowNull : false,
        },
        customerId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        discount : {
            type : DataTypes.INTEGER,
            allowNull : false,
            default : 0
        },
        total_price : {
            type : DataTypes.TEXT,
            allowNull : false,
        }
    }, {
        tableName : "orders"
    });
}


module.exports = orders;
