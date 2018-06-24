const mongoose = require('mongoose');
const Book = require('../model/mongoose.js').Book;
const BookShelf = require('../model/mongoose.js').BookShelf;

let asyncTracker = [];

function insertBooks() {
    const docs = [
        {
            _id: "5b2ff54c5953638f51215f0f",
            title: "The Cathedral and the Bazaar",
            isbn13: "9780596001087",
            bookshelf: "1"
        },
        {
            _id: "5b2ff54c5953638f51215f10",
            title: "Interaction of Color",
            isbn13: "9780300115956",
            bookshelf: "2"
        },
        {
            _id: "5b2ff54c5953638f51215f11",
            title: "JavaScript: The Good Parts",
            isbn13: "9780596517748",
            bookshelf: "3"
        }
    ];
    docs.forEach(doc => {
        const book = new Book(doc);
        asyncTracker.push(book.save());
    });
}

function insertBookShelves() {
    const docs = [
        {
            label: "To read"
        },
        {
            label: "Currently reading",
            maxBooks: 1
        },
        {
            label: "Read"
        }
    ];
    docs.forEach(doc => {
        const bookShelf = new BookShelf(doc);
        asyncTracker.push(bookShelf.save());
    });
}

insertBooks();
insertBookShelves();

Promise.all(asyncTracker).then(values => {
    // TODO this module should do separate data connection
    console.log('Book and Bookshelf items successfuly inserted.');
    mongoose.connection.close();
});
