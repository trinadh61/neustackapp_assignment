const { Sequelize } = require("sequelize");
const db = require("../models")
const {verifyCouponGeneration} = require('./couponService')
const coupon_code = require('../config/config.json')["coupon_code"]

const checkout = async (req) => {
    
    try {
        const body =Object.assign({}, req.body);
    
        const userDetails = await db.customer.findOne({
            where:{
                id : body.customer_id
            }
        })
    
        const new_coupon = verifyCouponGeneration(orders_post_last_coupon);

        const items = body.items;
        let total_price = items.reduce((total, item) => {
            return total + item.price
        }, 0);

        let data = {};
        data.total_price = total_price;

        if(new_coupon || userDetails.coupon_count != 0){
        data.coupon_code = coupon_code
        data.valid_coupon = true
        data.discount_percentage = 0.1
        }



        return {success : true, data : data}
    } catch (error) {
        return {success : false,  message : error.toString()}
    }
}