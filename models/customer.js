module.exports = customer;

// coupon_last_generated -> to check while generating coupons
// coupon_count -> no of times a coupon can be applied 

const customer = (sequelize, DataTypes) => {
    return sequelize.define('customer', {
        id  : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        coupon_count : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        coupon_last_generated : {
            type : DataTypes.DATETIME,
            allowNull : false,
        }
    }, {
        tableName : "customers"
    });
}