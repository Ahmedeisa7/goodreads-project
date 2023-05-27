const express = require('express');
const books = require('../model/books');
const booksRouter = express.Router();

booksRouter.post('/', expressAsyncHandler(async (res, res) => {
    const createBooks = await books.create(req.body);
    if (createBooks) {
        res.status(200);
        res.json(createBooks)
    }
    else {
        res.status(500);
        throw new Error("Can't create a new book.")
    }
}))

//Fetch book

booksRouter.get('/', expressAsyncHandler(async (res, res) => {
    const createBooks = await books.find({});
    if (createBooks) {
        res.status(200);
        res.json(createBooks)
    }
    else {
        res.status(500);
        throw new Error("We can't find this book.")
    }
}))


//Update book

booksRouter.put('/:id', expressAsyncHandler(async(req, res) => {
    
    const book = await createBooks.findById(req.params.id);
    if(book) {
        const bookUpdate = await createBooks.findByIdUpdate(req.params.id, req.body, { new:true });

        res.status(200);
        res.json(bookUpdate);
    }
    else {
        res.status(500);
        throw new Error("Can't update the book")
    }
})
)


router.get("/:id", (req, res) => {
    const { id } = req.params;
    if(!ObjectID.isValid(id)){
        res.status(400).json({
            Error: 'Id Is Not Valid in DB'
        })
    }
    else {
        UserModel.findById(id, (err, userData) => {
            if (!err) {
                return res.json(userData);
            } else {
                return res.status(500).json({ Error: "DB_ERROR" });
            }
        });
    }
});

module.exports = booksRouter