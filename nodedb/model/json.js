const jsonfile = require('jsonfile');
const dbBooksFile = './data/books.json';

class Book {
    constructor(bookData) {
        this.id = bookData.id || null;
        this.title = bookData.title;
        this.isbn13 = bookData.isbn13;
        this.bookshelf = bookData.bookshelf;
    }

    save() {
        return new Promise((resolve, reject) => {
            Book.find()
                .then(books => {
                    if (this.id == null) {
                        this.id = Book._generateBookId(books);
                        books.push(this);
                    } else {
                        let id = books.findIndex(book => {
                            return book.id == this.id;
                        });
                        books[id] = this;
                    }

                    // convert list to key-value store for JSON output
                    let items = {};
                    books.forEach(function(book) {
                        items[book.id] = book;
                    });

                    jsonfile.writeFile(dbBooksFile, items, {spaces: 4}, err => {
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

    remove() {
        return new Promise((resolve, reject) => {
            Book.find()
                .then(books => {
                    // convert list to key-value store for JSON output
                    let items = {};
                    books.forEach(function(book) {
                        items[book.id] = book;
                    });
                    delete items[this.id];
                    jsonfile.writeFile(dbBooksFile, items, {spaces: 4}, err => {
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
            jsonfile.readFile(dbBooksFile, function(err, items) {
                if (err) {
                    reject(err);
                }
                let books = [];
                for (let id in items) {
                    books.push(new Book({id: id, ...items[id]}));
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

class BookShelf {
    // TODO: implement BookShelf model
}

module.exports = { Book, BookShelf };
