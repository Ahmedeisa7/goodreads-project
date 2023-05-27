const express = require('express');
const router = express.Router();
const rating = require('../model/rating');
const book = require('../model/books');


router.get('/',async (req,res)=>{
   
    try { 
        const avgRate = await rating.aggregate([
            {$match:{rating}},
            {$group:{_id: null,avgRating:{$avg:'$rating'}}},
            // {
            //     $lookup: {
            //       from: 'rating', // Replace 'books' with the actual collection name for books
            //       localField: '_id',
            //       foreignField: '_id',
            //       as: 'name',
            //     },
            //   },
            //   { $unwind: 'title' },
           
        ]);
      

        res.status(201).json(avgRate);
       
        
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
    
})


module.exports = router;
