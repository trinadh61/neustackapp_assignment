const router = require('express').Router();
const orderService = require('../services/orderService')

router.get('checkout', (req, res) => {

    let {items, userid} = req.body;

    if(!items  && Array.isArray(items)){
        return res.status(403).json({message : "Item is either Invalid/ Empty"});
    }

    if(!userid){
        return res.status(403).json({message : "User Id is not found"})
    }

    let {status, data} = orderService.checkout(req);

    



    
})