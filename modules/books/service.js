const db = require('../../database/mysql.js');
const constants=require('../../utils/constants')

const book =db.Book;





const booklist= async(req,res)=>{

    const author_name = req.params.author;

    const findAuthor = await book.findAll({ where: {
        author_name: author_name
    }})

    if (findAuthor){
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: findAuthor
          })
    }else{
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.unauthorizedAccess,
            message: constants.messageKeys[req.headers[constants.rqstHeaders.langCode]].msg_invalid,
            data: {}
          })
    }
    
    

}


const bookDetails = async (req,res)=>{



   const findDeatils = await book.findAll({attributes: ['book_name', 'author_name' , 'description' , 'publish_Date']});

    
    if (findDeatils){
        
        res.status(200).json({success:findDeatils});
    }else{

        res.status(400).json({message:"error "})
    }
    }


module.exports = {
   
    booklist,
    bookDetails
}
