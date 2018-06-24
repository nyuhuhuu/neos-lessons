const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/books.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Successfully connected to the books database.');
});

class Book {
    constructor(bookData) {
        this.id = bookData.id || null;
        this.title = bookData.title;
        this.isbn13 = bookData.isbn13;
        this.bookshelf = bookData.bookshelf;
    }

    save() {
        return new Promise((resolve, reject) => {
            const book = this;
            if (book.id == null) {
                const sql = `INSERT INTO books VALUES (NULL, ?, ?, ?);`;
                db.run(sql, [book.title, book.isbn13, book.bookshelf], function (err) {
                    if (err) {
                        return reject(err);
                    }
                    book.id = this.lastID;
                    resolve(book);
                });
            } else {
                const sql = `UPDATE books SET bookshelf_id = ? WHERE id = ?`;
                db.run(sql, [book.bookshelf, book.id], function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(book);
                });
            }
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            const book = this;
            const sql = `DELETE FROM books WHERE id = ?;`;
            db.run(sql, [book.id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(book);
            });
        });
    }

    static find() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM books`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows.map(row => new Book(row)));
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, title, isbn13, bookshelf_id AS bookshelf FROM books WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                console.log(row);
                resolve(new Book(row));
            });
        });
    }
}

module.exports = Book;
