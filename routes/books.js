const express = require('express');
const books = require('../model/books');
const router = express.Router();

router.post('/', async (req, res) => {
    const createBooks = await books.create(req.body);
    if (createBooks) {
        res.status(200);
        res.json(createBooks)
    }
    else {
        res.status(500);
        throw new Error("Can't create a new book.")
    }
})

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