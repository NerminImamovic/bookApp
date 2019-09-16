const _ = require('lodash');

const Book = require('../models').Book;
module.exports = {
    addBook (data) {

        return Book
            .create(data)
            .then(book => { 
                
                const returnBook = book;
                returnBook.authors = JSON.parse(book.authors);
                
                return book;
            })
            .catch((error) => {

                console.log("Error " + error);

                throw error;
            });
    },
    getAllBooks() {
        return Book
            .findAll()
            .then(books => {
            
                const returnBooks = _.map(books, (book) => {
                    book.authors = JSON.parse(book.authors);

                    return book;
                });

                return returnBooks;
            })
            .catch((error) => {
                throw error;
            });
    },
    getBookById(bookId) {
        return Book
            .findByPk(bookId)
            .then(book => {
            
                const returnBook = book;
                returnBook.authors = JSON.parse(book.authors);

                return returnBook;
            })
            .catch((error) => {
                throw error;
            });
    },
    deleteBook(bookId) {
        return Book.destroy({ where: { id: bookId } })
            .then((result) => { 

                return result;
            })
            .catch(error => {
                throw error;
            });
    },
    updateBook(bookId, data) {


        const query = {
            id: bookId
        };

        return Book.update(
            data,
            {where: query}
        )
        .then((result) => {                 
            return result;
        })
        .catch(error => {
            throw error;
        });

    }
};
