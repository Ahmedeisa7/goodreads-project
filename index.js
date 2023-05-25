const express = require('express');
const mongoose = require('mongoose');
const { connect } = require('http2');
const app = express();
const categoryRouter = require('./routes/category');
const { connected } = require('process');
app.use(express.json());
const PORT = 55000;




app.use('/category', categoryRouter);








mongoose.connect("mongodb://127.0.1:27017/goodReadss",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("Db connected")
).catch((err)=>(console.log(err)));

app.listen(PORT,(err)=>{
    if(!err) return console.log(`you are listening on ${PORT}`);
    console.log(err);
});