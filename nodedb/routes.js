const config = require('./config');
const Book = require('./model/' + config.store).Book;
const BookShelf = require('./model/' + config.store).BookShelf;

module.exports = function(app) {

    app.get('/books', (req, res) => {
        Book.find()
            .then(books => {
                res.json(books);
            })
            .catch(err => {
                res.status(400).send({'ok': 0, 'message': err});
            });
    });

    app.get('/books/:bookId', (req, res) => {
        Book.findById(req.params.bookId)
            .then(book => {
                res.json(book);
            })
            .catch(err => {
                res.status(400).send({'ok': 0, 'message': err});
            });
    });

    app.post('/books', (req, res) => {
        const book = new Book({
            title: req.body.title,
            isbn13: req.body.isbn13,
            bookshelf: req.body.bookshelf
        });
        book.save()
            .then(newBook => {
                res.json(newBook);
            })
            .catch(err => {
                res.status(400).send({'ok': 0, 'message': err});
            });
    });

    app.put('/books/:bookId', (req, res) => {
        Book.findById(req.params.bookId)
            .then(book => {
                book.bookshelf = req.body.bookshelf;
                return book.save();
            })
            .then(newBook => {
                res.json(newBook);
            })
            .catch(err => {
                res.status(400).send({'ok': 0, 'message': err});
            });

    });

    app.delete('/books/:bookId', (req, res) => {
        Book.findById(req.params.bookId)
            .then(book => {
                return book.remove();
            })
            .then(() => {
                res.json({'ok': 1});
            })
            .catch(err => {
                res.status(400).send({'ok': 0, 'message': err});
            });
    });

};
