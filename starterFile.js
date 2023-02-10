const db = require('./models')
db.sequelize.sync().then(() => {
try {
 db.customer.bulkCreate([
    {
        coupon_last_generated : Date.now()
    },
    {
        coupon_last_generated : Date.now()
    },
    {
        coupon_last_generated : Date.now()
    },
 ])

 db.items.bulkCreate([
    {
        price : 40,
        name : "test1"
    },
    {
        price : 403,
        name : "test"
    },
    {
        price : 323,
        name : "test1343"
    },
    {
        price : 23,
        name : "test134"
    },
    {
        price : 343,
        name : "test34"
    },
    {
        price : 456,
        name : "test3"
    },
    ])
}

catch(e){
    console.log(e)
}
})