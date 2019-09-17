const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const app = require('../../src/app');
const sinon = require('sinon');
const should = chai.should();
chai.use(chaiHttp);

const bookService = require('../../src/services/bookService');

describe.only("externalBookController", () => {

    let result =  [
        {
          name: "A Game of Thrones",
          isbn: "978-0553103540",
          authors: [
            "George R. R. Martin"
          ],
          number_of_pages: 694,
          publisher: "Bantam Books",
          country: "United States",
          released_date: "1996-08-01T00:00:00"
        },
    ];

    nock('https://www.anapioficeandfire.com/api')
        .get('/books')
        .query({ name: 'A Game of Thrones' })
        .replyWithFile(200, __dirname + '/test_data/externalBooks.json', {
            'Content-Type': 'application/json',
        });

    it('GET /api/external-books?name=A Game of Thrones should Get all books', (done) => {
        chai.request(app)
        .get('/api/external-books?name=A Game of Thrones')
        .end((err, res) => {
            res.should.have.status(200);
            chai.expect(res.body).to.be.eql(result);
            done();
        });
    });

});
