const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const URL_DB = process.env.URL_DB;



// Category Route
const categoryRouter = require('./routes/category');
app.use('/category', categoryRouter);
app.use('/books/:id/rating', ratingRouter);

// User Route
const userRouter = require('./routes/users.js');
app.use('/users', userRouter);

// Connect TO DB
mongoose.connect(URL_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, 
    (err) => {
    if(!err) {
        console.log("DB Connected");
    } else {
        console.log('faild to connect');
    }
    });

app.listen(PORT,(err)=>{
    if(!err) return console.log(`you are listening on ${PORT}`);
    console.log(err);
});