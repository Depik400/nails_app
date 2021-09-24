const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.use(express.urlencoded({extends:false}))
app.use(express.json())

app.post('/singup',(req,res) => {
    console.log(res.body);
})

app.listen(3000,() => {
    console.log('server on');
})
