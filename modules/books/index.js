
const service = require('./service');

module.exports = function (app){


app.get('/book/details',service.bookDetails)

app.get('/book/:author',service.booklist);


// app.get('/book',service.books);



// app.get('/book',service.book2);

}