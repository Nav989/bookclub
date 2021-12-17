const db = require('../../database/mysql.js');
// const constants=require('../../utils/constants')

const book =db.Book;





const booklist= async(req,res)=>{

    

    const findAuthor = await book.findAll({ where: {
        author_name: req.author_name
    }})

    if (findAuthor){
        // res.status(constants.httpStatusCode.success).send({
        //     code: constants.responseCodes.successfulOperation,
        //     message: constants.messageKeys.en.msg_success,
        //     data: findAuthor
        //   })
        return findAuthor
    }else{
        // res.status(constants.httpStatusCode.success).send({
        //     code: constants.responseCodes.unauthorizedAccess,
        //     message: constants.messageKeys[req.headers[constants.rqstHeaders.langCode]].msg_invalid,
        //     data: {}
        //   })

        return false
    }
    
    

}


const bookDetails = async (req,res)=>{



   const findDeatils = await book.findAll({attributes: ['book_name', 'author_name' , 'description' , 'publish_Date']});

    
    if (findDeatils){
        
        return {findDeatils}
    }else{

        return false
    }
    }


module.exports = {
   
    booklist,
    bookDetails
}
