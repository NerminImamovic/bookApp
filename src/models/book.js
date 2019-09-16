'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    isbn: DataTypes.STRING,
    publisher: DataTypes.STRING,
    number_of_pages: DataTypes.STRING,
    release_date: DataTypes.STRING,
    authors: DataTypes.TEXT,
    country: DataTypes.STRING,
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};