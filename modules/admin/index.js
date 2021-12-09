const service = require('./service');

module.exports = function (app){

app.get('/admin/users/list',service.userlist),

app.put('/admin/user/edit',service.editUser),

app.get('/admin/user/:email/:name',service.searchUser);

app.get('/admin/user/type/:user_type',service.filterUser);

app.post('/admin/user/create',service.createUser)

//books

app.get('/admin/books/list',service.booklist)

app.put('/admin/book/edit/',service.updatebook),

app.delete('/admin/book/delete',service.deleteUser)

}