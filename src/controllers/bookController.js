const _ = require('lodash');

const BookService = require('../services').bookService;
module.exports = {
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

        console.log("Data " + JSON.stringify(data));

        try {
            const book = await BookService.addBook(data);

            res.status(201).send(book);            
        } catch (error) {

            console.log("Error " + JSON.stringify(error));

            res.status(400).send(error);
        }
    },
    async getAllBooks(req, res) {

        try {
            const books = await BookService.getAllBooks();

            res.status(200).send(books);
        } catch (error) {

            console.log("Errors " + error);

            res.status(400).send(error);
        }
    },
    async getBookById(req, res) {

        const bookId = req.param('bookId');

        try {
            const book = await BookService.getBookById(bookId);

            res.status(200).send(book);
        } catch (error) {

            res.status(400).send(error);
        }
    },
    async deleteBook(req, res) {
        console.log("Req param " + req.param('bookId'));

        const bookId = req.param('bookId');

        try {

            const isDeleted = await BookService.deleteBook(bookId);


            console.log("Ovdje " + isDeleted);

            if (isDeleted) {
                res.status(204).send();
            } else {
                res.status(404).send(); 
            }

        } catch (error) {

            console.log("Error " + JSON.stringify(error));

            res.status(400).send(error);
        }

    },
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

            console.log("IsUpdated " + isUpdated);

            if (isUpdated == 0) { 

                console.log("OOOVdje ");

                res.status(404).send();
                // next(); 

                // try {


                // } catch(error) {
                //     res.status(404).send();
                // }
            } else {

                const book = await BookService.getBookById(bookId);

                res.status(200).send(book); 

            }
           
            

        } catch (error) {
            
            console.log("Error " + error);

            res.status(400).send(error);
        }

    }
};
