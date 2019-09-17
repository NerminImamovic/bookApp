const _ = require('lodash');

const Book = require('../models').Book;
module.exports = {
    /**
     * Add book.
     * @param data
     * @return book 
     */
    addBook (data) {

        return Book
            .create(data)
            .then(book => { 
                
                const returnBook = book;
                returnBook.authors = JSON.parse(book.authors);
                
                return book;
            })
            .catch((error) => {

                throw error;
            });
    },
    /**
     * Get All books.
     * @return books
     */
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
    /**
     * Get Book by Id.
     * @param bookId 
     * @return book
     */
    getBookById(bookId) {
        return Book
            .findByPk(bookId)
            .then(book => {

                if (!book)
                    return null;

                const returnBook = book;
                returnBook.authors = JSON.parse(book.authors);

                return returnBook;
            })
            .catch((error) => {
                throw error;
            });
    },
    /**
     * Delete Book
     * @param bookId 
     * @return boolean
     */
    deleteBook(bookId) {
        return Book.destroy({ where: { id: bookId } })
            .then((result) => { 

                return result;
            })
            .catch(error => {
                throw error;
            });
    },
    /**
     * Update book
     * @param bookId 
     * @param data
     * @return boolean
     */
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
