const mongoose = require("mongoose")


const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required']
    },
    authors: [{
        type: String,
        required: [true, 'Author name is requried']
    }],
    category: [{
        type: String,
        required: [true, 'Book category is required']
    }],
    description: {
        type: String,
        required: [true, 'Book description is requried']
    },
    publication_date: {
        type: Date,
        required: [true, 'Book publication date is requried']
    },
    image_url: {
        type:String
    },
    book_url: {
        type:String
    },
    average_rating: {
        type: Number
    },
    ratings_count: {
        type: Number
    },
    reviews_count: {
        type: Number
    }

});

const books = mongoose.model('books', booksSchema);
module.exports = books