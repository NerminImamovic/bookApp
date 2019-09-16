const _ = require('lodash');

const externalBookService = require('../services').externalBookService;
module.exports = {
    async getBooks(req, res) {

        // console.log(req.query.name);

        const name = req.query.name;

        try {
            const books = await externalBookService.getBooks(name);

            res.status(200).send(books);
        } catch (error) {

            res.status(400).send(error);
        }
    }
};
