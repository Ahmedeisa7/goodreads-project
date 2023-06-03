const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({

name: { type: String, 
        unique: true, 
        required: true }
})

// Create the Category model
const category = mongoose.model('Category', categorySchema);

module.exports = category;




