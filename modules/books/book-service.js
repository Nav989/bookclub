const schemas = require('./book-schema')
const book = require('./book-model')
const constants = require('../../utils/constants');
const common = require('../../utils/common')




const  bookDetails  = async (req, res) => {


        const Ifaccess = await book.bookDetails()


        if (Ifaccess) {
            console.log(" success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log(" not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed,
                data: Ifaccess
              })
        }

}


const booklist = async (req, res) => {

    console.log(constants.moduleNames.books)
    const bookDetails = common.sanitize(req.params,schemas.booklist, constants.moduleNames.books);


    if (schemas.validate(bookDetails, schemas.booklist)) {

        const Ifaccess = await book.booklist(bookDetails)
         

        if (Ifaccess) {
            console.log(" success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log(" unsuccessful ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed,
                data: Ifaccess
              })
        }

    } else {
        console.log(" data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


module.exports={
    bookDetails,
booklist
}