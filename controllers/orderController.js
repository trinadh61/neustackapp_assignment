const router = require('express').Router();
const orderService = require('../services/orderService')

router.post('/checkout', async (req, res) => {

    let {items, customer_id} = req.body;

    if(!items  && Array.isArray(items)){
        return res.status(403).json({message : "Item is either Invalid/ Empty"});
    }

    if(!customer_id){
        return res.status(403).json({message : "User Id is not found"})
    }

    let {success, data, message} = await orderService.checkout(req);

    if(success){
        return res.status(200).json({success, data})
    }
    else{
        return res.status(400).json({success, message})
    }
    
})


router.post('/complete_transaction', async(req, res) => {

    let {items, customer_id, total_price, new_coupon} = req.body;

    let error_list = [];

    if(!items  && Array.isArray(items)){
        error_list.push( "Item")
    }

    if(!customer_id){
        error_list.push( "Customer Id")
    }

    if(!total_price){
        error_list.push("Total Price")
    }



    if(error_list.length !== 0)
    return res.status(403).json({message : `${error_list.join(', ')} is Invalid/Not Present`, success : false})


    let {success, data, message} = await orderService.complete_transaction(req);

    if(success){
        return res.status(200).json({success, data, message})
    }
    else{
        return res.status(400).json({success, message})
    }
    
})



router.get('/get_orders', async(req, res) => {

    let {customer_id} = req.body;

    let error_list = [];


    if(!customer_id){
        error_list.push( "Customer Id")
    }

    if(error_list.length !== 0)
    return res.status(403).json({message : `${error_list.join(', ')} is Invalid/Not Present`, success : false})


    let {success, data, message} = await orderService.get_orders(req);

    if(success){
        return res.status(200).json({success, data})
    }
    else{
        return res.status(400).json({success, message})
    }
    
})

module.exports = router;