const MongoClient = require('mongodb').MongoClient;
const config = require('./../config');

let db;

MongoClient.connect(config.mongoDbUrl, (err, client) => {
    if (err) {
        console.error(err.message);
    }
    db = client.db(config.mongoDbName);
    console.log('Successfully connected to the books database.');

    db.createCollection('books', err => {
        const docs = [
            {
                "title": "The Cathedral and the Bazaar",
                "isbn13": "9780596001087",
                "bookshelf": "1"
            },
            {
                "title": "Interaction of Color",
                "isbn13": "9780300115956",
                "bookshelf": "2"
            },
            {
                "title": "JavaScript: The Good Parts",
                "isbn13": "9780596517748",
                "bookshelf": "3"
            }
        ];
        db.collection('books').insertMany(docs, err => {
            client.close();
        });
    });

});

