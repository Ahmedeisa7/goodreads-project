const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const authorRouter = require('./routes/author');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/goodReads', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) return console.log("DB Connected");
    console.log("DB Not Connected");
});



app.use("/images", express.static(__dirname + '/storage'));


app.listen(port, (err) => {
    if (!err) return console.log(`Server Connected On Port: ${port}`);
    console.log('Server Is Not Connected');
});

app.use('/author', authorRouter);