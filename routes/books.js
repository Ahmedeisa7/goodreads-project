const express = require('express');
const books = require('../model/books');
const ObjectID=require('mongoose').Types.Objectid;
const router = express.Router();

router.get('/',async (req,res)=>{
try {
    const getAllBooks = await books.find()
    res.status(201).json(getAllBooks)
} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}
})

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

router.get("/:id",async (req, res) => {
    const { id } = req.params;
    try {
        const {id}=req.params
        const getBooks=  await books.findById({_id :id})
        res.status(200).json(getBooks)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.put('/:id', async(req,res)=>{

    // const { id } = req.params;
    // const updateBook = await UserModel.findByIdAndUpdate(id, {
    //   title: req.body.title,
    //   authors: req.body.authors,
    //   category: req.body.category,
    //   description: req.body.description,
    //   publication_date: req.body.publication_date,
    //   image_url: req.body.image_url,
    //   book_url: req.body.book_url,
    //   average_rating: req.body.average_rating,
    //   ratings_count: req.body.ratings_count,
    //   reviews_count: req.body.reviews_count,
    // }, { new: true });
    
    // if (!updateBook) {
    //   return res.status(404).json({ error: 'Book not found' });
    // }
    
    // // The updated book document will be available in the 'updateBook' variable
    // res.json({ message: 'Book updated successfully', book: updateBook });
    





    try {
        const{id} = req.params;
        const updataBook= await books.updateOne({_id:id}, {
            title: req.body.title,
            authors: req.body.authors,
            category: req.body.category,
            description: req.body.description,
            publication_date: req.body.publication_date,
            image_url: req.body.image_url,
            book_url: req.body.book_url,
            average_rating: req.body.average_rating,
            ratings_count: req.body.ratings_count,
            reviews_count:req.body.reviews_count,

        })
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
   
});
router.delete('/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const deleteBook = await UserModel.deleteOne({_id:id});
        res.status(201).json('deleted book successfully')
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router