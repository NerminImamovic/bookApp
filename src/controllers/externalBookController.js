const _ = require('lodash');

const externalBookService = require('../services').externalBookService;
module.exports = {
    /**
     * Get books.
     * @param req Request
     * @param res Response
     */
    async getBooks(req, res) {
        
        const name = req.query.name;

        try {
            const books = await externalBookService.getBooks(name);

            res.status(200).send(books);
        } catch (error) {

            res.status(400).send(error);
        }
    }
};
