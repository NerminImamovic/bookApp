const bookController = require('../controllers').bookController;
const externalBookController = require('../controllers').externalBookController;

module.exports = (app, router) => {

    router.route('/v1/books')
    .post(bookController.addBook)
    .get(bookController.getAllBooks);

    router.route('/v1/books/:bookId')
    .get(bookController.getBookById)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

    router.route('/v1/books/:bookId/delete')
    .delete(bookController.deleteBook);

    router.route('/external-books')
    .get(externalBookController.getBooks);

    app.use('/api', router);
}
