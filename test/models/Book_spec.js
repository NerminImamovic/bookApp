const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const BookModel = require('../../src/models/book');

describe('Book Model', () => {
    const Model = BookModel(sequelize, dataTypes)
    const instance = new Model()
    checkModelName(Model)('Book')
    context('properties', () => {
      ;['name', 'isbn', 'publisher', 'authors', 'release_date', 'country', 'number_of_pages'].forEach(checkPropertyExists(instance))
    })
})