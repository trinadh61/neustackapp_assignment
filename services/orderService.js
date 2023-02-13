const { Sequelize, where } = require("sequelize");
const db = require("../models")
const { verifyCouponGeneration, verifyCouponCode } = require('./couponService')
const coupon_code = require('../config/config.json')["coupon_code"]

const checkout = async (req) => {

    try {
        const body = Object.assign({}, req.body);

        const userDetails = await db.customer.findOne({
            where: {
                id: body.customer_id
            }
        })

        const new_coupon =await  verifyCouponGeneration(userDetails);

        const items = body.items;
        let total_price = items.reduce((total, item) => {
            return total + item.price
        }, 0);

        let data = {};
        data.total_price = total_price;

        if (new_coupon || userDetails.coupon_count != 0) {
            data.coupon_code = coupon_code
            data.valid_coupon = true
            data.discount_percentage = 10
        }

        return { success: true, data: data }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

const complete_transaction = async(req) => {
    try {
        const body = req.body;
    
        const order_object = {
            customerId : body.customer_id,
            discount : body.discount_percentage,
            total_price : body.total_price,
            items : body.items.map(item => item.id).join(",")
        }

        const userDetails = await db.customer.findOne({
            where: {
                id: body.customer_id
            }
        })

        const new_coupon = await  verifyCouponGeneration(userDetails);


        let coupon_count;
        if(body.coupon_applied && body.coupon_applied == true){
            coupon_count = verifyCouponCode(userDetails, new_coupon);
    
            if(!coupon_count || coupon_count == 0){
            return {success : false, message : "Coupon Code not Found"}
            }
            else{
                coupon_count = coupon_count -1;
            }
        }
        else if(new_coupon){
            coupon_count = userDetails.coupon_count + 1;
        }
    
        try {
            db.orders.create(order_object);
        
            let customer_update_object = {
                coupon_count : coupon_count,
                coupon_last_generated : new_coupon ? Date.now() : userDetails.coupon_last_generated
            }
            if((body.coupon_applied && body.coupon_applied == true) || new_coupon){
                db.customer.update(customer_update_object, {
                    where : {
                        id  : body.customer_id
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }

        return {success : true, message : "Order created successfully"}
    
        
    } catch (error) {
        return {success : false, message : error.toString()}
    }
}


const get_orders = async(req) =>{
    try {
        let {order_id, customer_id} = req.body;
    
        let whereObject = {
            customerId : customer_id
        }
    
        if(order_id)
        whereObject.id = order_id;
        
        let order_details =await db.orders.findAll({
            where : whereObject
        })
    
        return {success : true, data : order_details}
    
    } catch (error) {
        return {success : false, message : error.toString()}
    }


}

module.exports = {
    get_orders, complete_transaction, checkout
}