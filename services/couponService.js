const coupon_regeneraration_day_count = require('../config/config.json')['coupon_regeneraration_day_count'];
const db = require('../models')
const Sequelize = db.Sequelize;

const verifyCouponGeneration = async(userDetails) => {
    const orders_post_last_coupon= await db.orders.findAll(
        {
            where :{
                createdAt : {
                    [Sequelize.Op.gt] : userDetails.coupon_last_generated
                },
                customerId : userDetails.id
            },
            attributes : [[Sequelize.fn('count', Sequelize.col("id")), "orderCount"]],
            raw : true
        }
    )

    if(orders_post_last_coupon[0].orderCount === coupon_regeneraration_day_count-1)
    return true;
    else
    return false;
}


const verifyCouponCode = (userDetails, new_coupon) => {

    if(new_coupon || userDetails.coupon_count != 0){
        return new_coupon ? userDetails.coupon_count+1 : userDetails.coupon_count
    }

    return null;
}


module.exports = {
    verifyCouponGeneration,
    verifyCouponCode
}