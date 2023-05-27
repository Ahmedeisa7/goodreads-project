const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const URL_DB = process.env.URL_DB;
const registerRouter =require('./routes/register')
const ratingRouter =require('./routes/rating')
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/users.js');
const booksRouter = require('./routes/books');



// Category Route
app.use('/category', categoryRouter);
// rating Route
app.use('/books/:id/rating', ratingRouter);
// register Route
app.use('/register', registerRouter);
// User Route
// app.use('/users', userRouter);
// books Route
app.use('/books', booksRouter);


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