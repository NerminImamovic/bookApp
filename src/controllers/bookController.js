const _ = require('lodash');

const BookService = require('../services').bookService;
module.exports = {
    /**
     * Add book.
     * @param req Request
     * @param res Response
     */
    async addBook (req, res) {

        const data = {
            name: req.body.name,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            release_date: req.body.release_date,
            country: req.body.country,
            number_of_pages: req.body.number_of_pages,
            authors: JSON.stringify(req.body.authors),
        };

        try {
            const book = await BookService.addBook(data);

            res.status(201).send(book);

        } catch (error) {
            
            res.status(400).send(error);
        }
    },
    /**
     * Get all books.
     * @param req Request
     * @param res Response
     */
    async getAllBooks(req, res) {

        try {
            const books = await BookService.getAllBooks();

            res.status(200).send(books);
        } catch (error) {

            res.status(400).send(error);
        }
    },
    /**
     * Get book by Id.
     * @param req Request
     * @param res Response
     */
    async getBookById(req, res) {

        const bookId = req.param('bookId');

        try {
            const book = await BookService.getBookById(bookId);


            if (book) {
                res.status(200).send(book);
            } else {
                res.status(404).send(); 
            }

        } catch (error) {

            res.status(400).send(error);
        }
    },
    /**
     * Delete book.
     * @param req Request
     * @param res Response
     */
    async deleteBook(req, res) {

        const bookId = req.param('bookId');

        try {

            const isDeleted = await BookService.deleteBook(bookId);

            if (isDeleted) {
                res.status(204).send();
            } else {
                res.status(404).send(); 
            }

        } catch (error) {

            res.status(400).send(error);
        }
    },
    /**
     * Update Book.
     * @param req Request
     * @param res Response
     */
    async updateBook(req, res, next) {

        const bookId = req.param('bookId');

        const data = {
            name: req.body.name,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            release_date: req.body.release_date,
            updatedAt: new Date(),
            authors: !_.isUndefined(req.body.authors) || !_.isNull(req.body.authors) ? JSON.stringify(_.split(req.body.authors, ",")) : undefined,
        };

        try {
            
            const isUpdated = await BookService.updateBook(bookId, data);

            if (isUpdated == 0) { 

                res.status(404).send();

            } else {

                const book = await BookService.getBookById(bookId);

                res.status(200).send(book); 

            }
        } catch (error) {
            
            res.status(400).send(error);
        }

    }
};
