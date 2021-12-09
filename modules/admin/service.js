const bcrypt = require('bcrypt');
const db = require('../../database/mysql.js');
var mailer = require('../../utils/mailer');
const saltRounds = 12;


const Users = db.User;
const book =db.Book;


const userlist = async (req, res) => {

    const userData = await Users.findAll({attributes:[ "id","name","surname","email","user_type"]});

    if(userData){
        res.status(200).json({success:userData});
    }else{

        res.status(400).json({message:" can't able get data"})

    }

}



const editUser = async(req,res)=>{

    const {name,surname,dob,user_type} = req.body;


    if (req.body.password === req.body.cpassword) {

        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        const editData = await Users.update({
            name: name,
            surname: surname,
            dob: dob,
            password: encryptedPassword,
            user_type: user_type
        },{
            where: {
              email:req.body.email
            }

        });

        res.status(201).send({success:editData})
        
    } else {
        res.status(400).json({message: "password & cP not same"})
    }
    
    }


    const searchUser= async(req,res)=>{

        const name = req.params.name;
        const email = req.params.email;
    
        const findUser = await Users.findOne({ where: {
           email:email,name:name
        }})

        

        
    
        if (findUser.email && findUser.name){         
            res.status(200).json(findUser);
            console.log(findUser.email);
        console.log(findUser.name)
           
        }else{
    
            res.status(400).json({message:"error "})
    
        }
    }

    const filterUser= async(req,res)=>{

        
        const user_type = req.params.user_type;
    
        const usertype = await Users.findAll({ where: {
            user_type:user_type
        }})
    
        if (usertype){
            
            res.status(200).json(usertype);
        }else{
    
            res.status(400).json({message:"error "})
    
        }
    }


    const createUser=async(req,res)=>{
    const {user_type,name,surname,dob,email,password} = req.body

        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        console.log(encryptedPassword);

        const createData = await Users.create({
            user_type: user_type,
            name: name,
            surname: surname,
            dob: dob,
            email: email,
            password: encryptedPassword,
            
        });

        await createData.save()

        if(createData){
        res.status(201).send({success:createData})
        const message=("THIS YOUR USERNAME :-" + createData.email + "\n" + " THIS IS YOUR PASSWORD:-"+createData.password);
          mailer(createData.email,message,subject=("your details"));
        }else{
    
            res.status(400).json({message:"error "})
    
        }
    }



    ///BOOKS


    const booklist = async(req,res)=>{
        const bookinfo = await book.findAll({attributes:[ 'id','book_name','author_name','publish_Date']});
         
                 if(bookinfo){
                     res.status(200).json({success:bookinfo});
                 }else{
         
                     res.status(400).json({message:" can't access data"})
         
                 }
             }


             const updatebook = async(req,res)=>{

                const {book_image,book_name,availability_status,page_count,description,publish_Date,quantity} = req.body
            
               
            
                const editbookData = await book.update({ book_image:book_image,
                                                  book_name:book_name ,
                                 availability_status:availability_status ,
                                                    page_count:page_count,
                                                    description:description,
                                                publish_Date:publish_Date,
                                                quantity:quantity
                }, {
                    where: {
                      author_name:req.body.author_name
                    }
                  });
            
                    if(editbookData){
                        res.status(200).json({success:editbookData});
                    }else{
            
                        res.status(400).json({message:"can't edited books"})
            
                    }
                }       


                const deleteUser=async(req,res)=>{

                    const deleteData= await book.destroy({where:{author_name:req.body.author_name}})

                    if(!deleteData){
                        res.status(400).json({message:"not deleted"})
                    }else{
                    res.status(200).json({success:deleteData});
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
   deleteUser,
}