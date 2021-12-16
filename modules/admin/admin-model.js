// const bcrypt = require('bcrypt');
const db = require('../../database/mysql.js');
var mailer = require('../../utils/mailer');
const encryption=require('../../utils/encryption')




const Users = db.User;
const book =db.Book;


const userlist = async (req, res) => {

    const userData = await Users.findAll({attributes:[ "id","name","surname","email","user_type"]});

    if(userData){
        return userData
        // res.status(200).json({success:userData});
    }else{

        // res.status(400).json({message:" can't able get data"})
        return false

    }

}

const createUser = async(req,res)=>{

    const {name,surname,dob,email,user_type} = req;


    if (req.password === req.cpassword) {

        const password = req.password;
        const encryptedPassword = await encryption.getencrypted(password);
        const createData = await Users.create({
            name: name,
            surname: surname,
            dob: dob,
            email: email,
            password: encryptedPassword,
            user_type: user_type
        });



        if(createData){
            const decryptedPassword = await encryption.getdecryptedPassword(encryptedPassword);
            console.log(decryptedPassword)
            if(decryptedPassword){
                const message=("THIS YOUR USERNAME :- " + createData.email + "\n" + " THIS IS YOUR PASSWORD:- " + decryptedPassword);
                mailer(createData.email,message,subject=("your details"));
                return {createData}
            }else{
                return false
            }
        }  
    } else {
        return false
    }
    
    }


const editUser =async(req,res)=>{

    const {user_type,name,surname,dob,password} = req
    const encryptedPassword =  await encryption.getencryptedPassword(password);

        console.log(encryptedPassword);

        const editData = await Users.update({
            user_type: user_type,
            name: name,
            surname: surname,
            dob: dob,
            password: encryptedPassword,
            
        },{
            where: {
              email:req.email
            }

        });

        if(editData){
            return{editData};
        }else{
    
            return false
    
        }
    }





    const searchUser= async(req,res)=>{

        const name = req.name;
        const email = req.email;
    
        const findUser = await Users.findOne({ where: {
           email:email,name:name
        }})
    
        if (findUser.email && findUser.name){   
            console.log(findUser.email);
            console.log(findUser.name)      
            return {findUser};
           
           
        }else{
    
            return false
    
        }
    }

    const filterUser= async(req,res)=>{

        
        const user_type = req.user_type;
    
        const usertype = await Users.findAll({ where: {
            user_type:user_type
        }})
    
        if (usertype){
            
            return {usertype}
        }else{
    
            return false
    
        }
    }


  
    ///BOOKS

    const booklist = async(req,res)=>{
        const bookinfo = await book.findAll({attributes:[ 'id','book_name','author_name','publish_Date']});
         
                 if(bookinfo){
                     return bookinfo
                 }else{
         
                     return false
         
                 }
             }


             const updatebook = async(req,res)=>{

                const {book_image,book_name,availability_status,page_count,description,publish_Date,quantity} = req
            
               
            
                const editbookData = await book.update({ book_image:book_image,
                                                  book_name:book_name ,
                                 availability_status:availability_status ,
                                                    page_count:page_count,
                                                    description:description,
                                                publish_Date:publish_Date,
                                                quantity:quantity
                }, {
                    where: {
                      author_name:req.author_name
                    }
                  });
            
                    if(editbookData){
                        return {editbookData}
                    }else{
            
                        return false
            
                    }
                }       


                const deletebook=async(req,res)=>{

                    const deleteData= await book.destroy({where:{author_name:req.author_name}})

                    if(!deleteData){
                        return false
                    }else{
                    return {deleteData}
                    }
                }

module.exports = {
   userlist,
   editUser,
   searchUser,
   filterUser,
   createUser,
   //books section
   booklist,
   updatebook,
   deletebook,
}