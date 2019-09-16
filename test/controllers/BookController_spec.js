const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const sinon = require('sinon');
const should = chai.should();
chai.use(chaiHttp);

const bookService = require('../../src/services/bookService');

describe('BookController methods', () => {

    let books = [
        {
            id: 1,
            name: "My First Book",
            isbn: "23-3213243567",
            publisher: "Acme Books",
            country: "United States",
            number_of_pages: 250,
            release_date: "2019-08-01",
            authors: [
              "John Doe"
            ]
        },
    ]

    const body = {
        name: "My First Book",
        isbn: "23-3213243567",
        publisher: "Acme Books",
        country: "United States",
        number_of_pages: 250,
        release_date: "2019-08-01",
        authors: [
          "John Doe"
        ]
    };

    const bookServiceMock = sinon.mock(bookService);
    
    beforeEach(() => {
        bookServiceMock.expects('getAllBooks').returns([]);
        bookServiceMock.expects('getBookById').returns(books[0]);
        bookServiceMock.expects('deleteBook').returns(true);
        bookServiceMock.expects('updateBook').returns(true);
    });

    it('GET /api/v1/books should Get all books', (done) => {
        chai.request(app)
        .get('/api/v1/books')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });

    it('GET /api/v1/books/:bookId should get a book with bookId', (done) => {
        chai.request(app)
        .get('/api/v1/books/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('POST /api/v1/books should Create a new book', (done) => {
        chai.request(app)
        .post('/api/v1/books')
        .send(body)
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });

    it('PATCH /api/v1/books/:bookId should update a book with bookId', (done) => {
        chai.request(app)
        .patch('/api/v1/books/1')
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });

    it('DELETE /api/v1/books/:bookId should delete a book with bookId', (done) => {
        chai.request(app)
        .delete('/api/v1/books/1')
        .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
        });
    });

    it('DELETE /api/v1/books/:bookId/delete should delete a book with bookId', (done) => {
        chai.request(app)
        .delete('/api/v1/books/1')
        .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
        });
    });



});