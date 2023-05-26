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

module.exports = booksRouter;