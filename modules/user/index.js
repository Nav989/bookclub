
const service = require('./service');
const {verifyToken}= require('../../middleware/sessiontoken');
// const {verifyotp}= require("../../middleware/verifyotp");


module.exports = function (app){

app.post('/user/signup', service.register)

app.post('/user/signin', service.login)

app.post('/user/list', verifyToken, service.UserList);

app.post('/user/forgotPassword',verifyToken,service.emailSend);

app.post('/user/changePassword',verifyToken,service.changePassword);

app.put('/user/edit',verifyToken,service.editUser),

app.post('/user/book/reader',verifyToken,service.userBook),

app.post('/user/book/list/borrowed',verifyToken,service.allborrowedbook),

app.put('/user/book/borrow',verifyToken,service.borrow),

app.put('/user/book/return',verifyToken,service.returnbook),

app.put('/user/book/recommend',verifyToken,service.recommendbook),

app.put('/user/book/rate',verifyToken,service.ratebook),

app.post('/user/book/viewdays',service.viewpending),

app.put('/user/book/favourite',verifyToken,service.favbook),

app.put('/user/book/removefav',verifyToken,service.removefavbook)

app.post('/user/book/list/favourite',verifyToken,service.listfavbook)

}