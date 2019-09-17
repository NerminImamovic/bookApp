const axios = require('axios');
const _ = require('lodash');

module.exports = {
    async getBooks(name) {
        
        try {

            const { data: result } = await axios.get(`https://www.anapioficeandfire.com/api/books?name=${name}`);

            const books = _.map(result, (book) => {
                return { 
                    name: book.name,
                    isbn: book.isbn,
                    authors: book.authors,
                    number_of_pages: book.numberOfPages,
                    publisher: book.publisher,
                    country: book.country,
                    released_date: book.released
                }
            });

            return books;
        
        } catch(error) {
            throw error;
        }
    }
};
