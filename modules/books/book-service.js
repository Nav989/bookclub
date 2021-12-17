const schemas = require('./book-schema')
const book = require('./book-model')
const constants = require('../../utils/constants');
const common = require('../../utils/common')




const  bookDetails  = async (req, res) => {


        const Ifaccess = await book.bookDetails()


        if (Ifaccess) {
            console.log(" success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

}


const booklist = async (req, res) => {

    console.log(constants.moduleNames.books)
    const bookDetails = common.sanitize(req.params,schemas.booklist, constants.moduleNames.books);


    if (schemas.validate(bookDetails, schemas.booklist)) {

        const Ifaccess = await book.booklist(bookDetails)
         

        if (Ifaccess) {
            console.log(" success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" unsuccessful ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log(" data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}


module.exports={
    bookDetails,
booklist
}