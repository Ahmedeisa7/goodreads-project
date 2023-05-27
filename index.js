const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const URL_DB = process.env.URL_DB;
const ratingRouter = require('./routes/rating');
const userRouter = require('./routes/users.js');
const registerRouter = require('./routes/register.js');
const loginRouter = require('./routes/login.js');
const auth = require('./middleware/auth.js');
const categoryRouter = require('./routes/category');
const authorRouter = require('./routes/author');




// Category Route
app.use('/category', categoryRouter);
// rating Route
app.use('/books/:id/rating', ratingRouter);
// user route
app.use('/users', userRouter);
// register route
app.use('/register', registerRouter);
// // login route
app.use('/login', loginRouter);
// welcome after auth
app.post('/welcome', auth, (req, res) => {
    res.send("Welcome ");
});
app.use('/author', authorRouter);


app.use("/images", express.static(__dirname + '/storage'));



// Connect TO DB
mongoose.set('strictQuery', true);
mongoose.connect(URL_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (err) => {
        if (!err) {
            console.log("DB Connected");
        } else {
            console.log('faild to connect');
        }
    });

app.listen(PORT, (err) => {
    if (!err) return console.log(`you are listening on ${PORT}`);
    console.log(err);
});
