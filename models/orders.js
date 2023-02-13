


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
            defaultValue : "success"
        },
        customerId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        discount : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
        total_price : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        items : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    }, {
        tableName : "orders"
    });
}


module.exports = orders;
