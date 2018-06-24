const mongoose = require('mongoose');
const config = require('./../config');

mongoose.connect(config.mongoDbUrl, err => {
    if (err) {
        console.error(err.message);
    }
    console.log('Successfully connected to the books database.');
});

const bookSchema = mongoose.Schema({
    title: String,
    isbn13: String,
    bookshelf: Number
});

const bookShelfSchema = mongoose.Schema({
    label: String,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    maxBooks: Number
});

const Book = mongoose.model('Book', bookSchema);
const BookShelf = mongoose.model('BookShelf', bookShelfSchema, 'bookshelves');

module.exports = { Book, BookShelf };
