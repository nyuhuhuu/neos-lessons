const jsonfile = require('jsonfile');
const dbBooksFile = './data/books.json';

class Book {
    constructor(bookData) {
        if ('id' in bookData) {
            this.id = bookData.id;
        }
        this.title = bookData.title;
        this.isbn13 = bookData.isbn13;
        this.bookShelf = bookData.bookshelf;
    }

    save() {
        return new Promise((resolve, reject) => {
            Book.find()
                .then(books => {
                    this.id = Book._generateBookId(books);
                    books.push(this);
                    jsonfile.writeFile(dbBooksFile, books, {spaces: 4}, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this);
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
                resolve(books.map(bookData => new Book(bookData)));
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
