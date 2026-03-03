const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  addedAt: {
    type: Date,
    default: Date.now, 
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;