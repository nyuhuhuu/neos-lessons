const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let db;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
    if (err) {
        console.error(err.message);
    }
    db = client.db('test');
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
            if (this.id == null) {
                db.collection('books').insert(this, err => {
                    if (err) {
                        return reject(err);
                    }
                    this.id = this._id;
                    delete this._id;
                    resolve(this);
                });
            } else {
                const updateSet = {bookshelf: this.bookshelf};
                db.collection('books').update({_id: ObjectID(this.id)}, {$set:updateSet}, err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(this);
                });
            }
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.collection('books').remove({_id: ObjectID(this.id)}, err => {
                if (err) {
                    return reject(err);
                }
                resolve(this);
            });
        });
    }

    static find() {
        return new Promise((resolve, reject) => {
            db.collection('books').find().toArray(function(err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs.map(doc => new Book({id: doc._id, ...doc})));
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.collection('books').findOne({_id: ObjectID(id)}, function(err, doc) {
                if (err) {
                    reject(err);
                }
                resolve(new Book({id: doc._id, ...doc}));
            });
        });
    }
}

module.exports = Book;
