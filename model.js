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
            Book.find()
                .then(books => {
                    const newBook = {
                        id: Book._generateBookId(books),
                        title: this.title,
                        isbn13: this.isbn13,
                        bookshelf: this.bookShelf
                    };
                    books.push(newBook);
                    jsonfile.writeFile(dbBooksFile, books, {spaces: 4}, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newBook);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
        });
    }

    static _generateBookId(books) {
        let maxId = null;
        books.forEach(function(book) {
            let bookId = parseInt(book.id);
            if (bookId > maxId) {
                maxId = bookId;
            }
        });
        return maxId + 1;
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
