const db = require('../../database/mysql.js');

const book =db.Book;





const booklist= async(req,res)=>{

    const author_name = req.params.author;

    const findAuthor = await book.findAll({ where: {
        author_name: author_name
    }})

    if (findAuthor){
        
        res.status(200).json(findAuthor);
    }else{

        res.status(400).json({message:"error "})

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
