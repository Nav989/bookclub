
let  service = require('./author-service');
const {verifyToken}= require('../../middleware/sessiontoken');


module.exports=function(app){
app.post('/author/signup', service.register);

app.post('/author/signin', service.login);

app.post('/author/forgotPassword',verifyToken,service.emailSend);

app.post('/author/changePassword',verifyToken,service.changePassword);

app.post('/author/book/add_book',verifyToken ,service.addbook);

app.put('/author/book/edit',verifyToken,service.editbook)

app.post('/author/book/list',verifyToken,service.listbook)



}