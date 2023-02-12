const coupon_regeneraration_day_count = require('../config/config.json')['coupon_regeneraration_day_count'];

const verifyCouponGeneration = async(userDetails) => {
    const orders_post_last_coupon= await db.orders.findAll(
        {
            where :{
                createdAt : {
                    [Op.gte] : userDetails.coupon_last_generated
                }
            },
            attributes : [[Sequelize.fn('count', Sequelize.col("id")), "orderCount"]]
        }
    )

    if(orders_post_last_coupon === coupon_regeneraration_day_count)
    return true;
    else
    return false;
}


exports.default = {
    verifyCouponGeneration
}