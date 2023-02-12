
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
            defaultValue : 0,
        },
        coupon_last_generated : {
            type : DataTypes.DATE,
            allowNull : false,
        }
    }, {
        tableName : "customers"
    });
}

module.exports = customer;
