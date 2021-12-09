module.exports = function (app){

    require('../modules/user/index')(app),
    require('../modules/author/index')(app),
    require('../modules/books/index')(app),
    require('../modules/admin/index')(app)
}