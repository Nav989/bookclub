const service = require('./admin-service');

module.exports = function (app){

app.get('/admin/users/list',service.userlist),

app.post('/admin/user/create',service.createUser);

app.put('/admin/user/edit',service.editUser);

app.get('/admin/user/type/:user_type',service.User_type);


app.get('/admin/user/:email/:name',service.searchUser);




// //books

app.get('/admin/books/list',service.booklist)

app.put('/admin/book/edit/',service.updatebook);

app.delete('/admin/book/delete',service.deletebook)

}