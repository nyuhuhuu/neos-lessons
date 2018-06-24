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
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
        });
    }
}

module.exports = Book;
