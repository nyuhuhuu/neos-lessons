const jsonfile = require('jsonfile');
const dbBooksFile = './data/books.json';

class Book {
    constructor(bookData) {
        this.title = bookData.title;
        this.isbn13 = bookData.isbn13;
        this.bookShelf = bookData.bookShelf;
    }

    save() {
        return new Promise((resolve, reject) => {
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
        });
    }

    static find() {
        return new Promise((resolve, reject) => {
            jsonfile.readFile(dbBooksFile, function(err, books) {
                if (err) {
                    reject(err);
                }
                resolve(books);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            Book.find()
                .then(books => {
                    const result = books.filter(book => book.id == id);
                    if (result.length > 1) {
                        reject("Multiple items found");
                    } else {
                        resolve(result[0]);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

module.exports = Book;
