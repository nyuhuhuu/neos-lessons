const Book = require('./model.js');

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

    app.post('/books', (req, res) => {
        const book = new Book({
            title: req.body.title,
            isbn13: req.body.isbn13,
            bookShelf: req.body.bookshelf
        });
        book.save()
            .then(() => {
                res.json(book);
            })
            .catch(err => {
                res.status(400).send({'ok': 0, 'message': err});
            });
    });

    app.put('/books/:bookId', (req, res) => {
        Book.findById(req.params.bookId)
            .then(book => {
                book.bookShelf = req.body.bookshelf;
                book.save()
                    .then(() => {
                        res.json(book);
                    })
                    .catch(err => {
                        res.status(400).send({'ok': 0, 'message': err});
                    });
            });

    });

    app.delete('/books/:bookId', (req, res) => {
        Book.findById(req.params.bookId)
            .then(book => {
                book.delete().
                    then(() => {
                        res.json({'ok': 1});
                    })
                    .catch(err => {
                        res.status(400).send({'ok': 0, 'message': err});
                    });
            });
    });

};
