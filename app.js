const express = require('express');
const app = express();
const body_parser = require('body-parser')

app.listen(8080, (error) => {
    if(error)
    console.log("Server not started " ,error)
    else{
        console.log("App Started listen on Port 8080");
    }
})

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}))
