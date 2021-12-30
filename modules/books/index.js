
const service = require('./book-service');

module.exports = function (app){


app.get('/book/details',service.bookDetails)

app.get('/book/:author_name',service.booklist);

}