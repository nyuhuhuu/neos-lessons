const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/books.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Successfully connected to the books database.');
});

function createTables() {
    const createBooksTableSql = `
CREATE TABLE books (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255),
  isbn13 VARCHAR(255),
  bookshelf_id INTEGER NOT NULL,
  FOREIGN KEY (bookshelf_id) REFERENCES bookshelves(id)
);`;
    db.run(createBooksTableSql, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Table "books" successfuly created.');
        }
    });

    const createBookshelvesTableSql =`
CREATE TABLE bookshelves (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  label VARCHAR(255),
  maxbooks INTEGER DEFAULT 10
);`;
    db.run(createBookshelvesTableSql, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Table "bookshelves" successfuly created.');
        }
    });
}

function insertInitialData() {
    const enableForeignKeysSql = `PRAGMA foreign_keys = ON;`;
    db.run(enableForeignKeysSql, function(err) {
        if (err) {
            console.error(err);
        }
    });

    const insertBookshelvesSql = `
INSERT INTO bookshelves VALUES
(NULL, "To read", NULL),
(NULL, "Currently reading", 1),
(NULL, "To read", NULL)
;`;
    db.run(insertBookshelvesSql, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Bookshelf items successfuly inserted.');
        }
    });

    const insertBooksSql = `
INSERT INTO books VALUES
(NULL, "The Cathedral and the Bazaar", "9780596001087", 1),
(NULL, "Interaction of Color", "9780300115956", 2),
(NULL, "JavaScript: The Good Parts", "9780596517748", 3)
;`;
    db.run(insertBooksSql, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Book items successfuly inserted.');
        }
    });
}

db.serialize(createTables);
db.serialize(insertInitialData);

db.close();
