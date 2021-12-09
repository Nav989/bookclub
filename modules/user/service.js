
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwt = require('jsonwebtoken');
const db = require('../../database/mysql.js');
var mailer = require('../../utils/mailer');





const jwtkey = "nav123";

const Users = db.User;

const newotp=db.otp;

const book =db.Book;

const books=db.userbook;


const register = async (req, res) => {

    const {name,surname,dob,email,user_type} = req.body
    if (req.body.password === req.body.cpassword) {

        const password = req.body.password;
        //hashing of password
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        console.log(encryptedPassword);

        const createData = await Users.create({
            name: name,
            surname: surname,
            dob: dob,
            email: email,
            password: encryptedPassword,
            user_type: user_type
        });

        await createData.save()
        res.status(201).send({success:createData})
        
    } else {
        res.status(400).json({
            message: "password & cP not same"
        })
        console.log("password not matched")
    }

}





const login = async (req, res) => {

    const { email,password,user_type} = req.body;

    if (!email || !password || !user_type) {
        return res.status(400).json({
            error: "please filled the data"
        })
    }

    const createData = await Users.findOne({
        where: {
            email: email,
            user_type: user_type
        }
    });



    if (createData) {
        const hash = createData.password;
        //comparing register password and user password
        bcrypt.compare(password, hash, function (err, result) {
            if (err) throw err
            else if (result) {

                jwt.sign({createData}, jwtkey, { expiresIn: '1d' }, (err, token) => {
                    if(err)throw err;
                    res.status(201).json({success: createData,token})
                    console.log(token);
                })
            } else {
                res.status(400).json({
                    message: "creaditional not matched with register user",
                })
            }
        })

    } else {
        res.status(400).json({
            message: "data not matched with register"
        })
        console.log("wrong input")
    }
}


const UserList= async(req,res)=>{

    const { email} = req.body;

    const findUser = await Users.findOne({ where: {
        email: email
    }})

    if (findUser){
        
        res.status(200).json(findUser);
    }else{

        res.status(400).json({message:"error "})

    }
}


const emailSend= async(req,res)=>{

    const { email} = req.body;

    if(!email){
        return res.status(400).json({
            error: "please filled the data"
        })
    }else{

    const findUser = await Users.findOne({ where: {
        email: email
    }})


    if (findUser){

        let otpcode = Math.floor((Math.random()*10000)+1);
        let otpData= await newotp.create({
            email:req.body.email,
            otp:otpcode,
            expireIn:new Date().getTime() + 60000*2
        });

        await otpData.save();
        
        if(otpData){
            res.status(200).json({success:otpData});
            console.log(otpData.expireIn)
           const message=("THIS IS YOUR  OTP " + otpData.otp)
            mailer(otpData.email,message,subject=("YOUR OTP"));
        }else{

            res.status(400).json({message:"not created"})

        }
    }else{

        res.status(400).json({message:"WRONG EMAIL ID "})

    }

}
   
}




const changePassword =async(req,res)=>{


    const { email , otp  } = req.body;

   
    let data = await newotp.findOne({ where:{
        email:email,
        otp:otp
    } })

    if(data){

        
        let currentTime = new Date().getTime();
        let diff= data.expireIn - currentTime;
        console.log(data.expireIn + ":" +currentTime)
        if(diff < 0){
           res.status(400).json({message:"Time expire"});
           console.log("time expire")
           
        }else{

            let  user = await Users.findOne({where:{ email:email}})
             password  = req.body.password;
      //hashing of password
      const encryptedPassword = await bcrypt.hash(password, saltRounds)
      user.password=encryptedPassword;
      console.log(encryptedPassword);
      user.save();
      if(!user){
        res.status(400).json({message:"error"});
      }else{
        res.status(200).json({success:user});     
      }


        }
             
    }else{
        res.status(400).json({message:"invalid otp or email"});
        console.log("invalid otp or email")
    }
   


}



const editUser = async(req,res)=>{

    const {name,surname,dob,email,user_type} = req.body

    const Userdata = await Users.update({name:name,surname:surname,dob:dob,user_type }, {
        where: {
          email:email
        }
      });

       

        if(Userdata){
            res.status(200).json({success:Userdata});
        }else{

            res.status(400).json({message:"not updated"})

        }
    }




    const userBook= async(req,res)=>{

        const{favourite,borrow_book, return_book ,recommend,rate_book,buying_date,return_date,RegReaderId} = req.body;

        const takebook= await books.create({
            favourite:favourite,
            borrow_book:borrow_book,
            return_book:return_book,
            recommend:recommend,
            rate_book:rate_book,
            buying_date:buying_date,
            return_date:return_date,
            RegReaderId:RegReaderId
        })
         

        if(takebook){
            res.status(200).json({success:takebook});
        }else{

            res.status(400).json({message:"not created"})

        }

    }

const allborrowedbook=async(req,res)=>{

    const user_data = await Users.findOne({where: {email:req.body.email}});

    if(user_data){
    
    const allborrow = await books.findAll({
        attributes:['booklistId'],
        include:[{

          model:book,
          attributes:['book_name']
          
        }],
        
        where:{borrow_book :true,RegReaderId:user_data.id}})

    if(allborrow){

        res.status(200).json({success:allborrow});

    }else{
        res.status(400).json({message:"error"})
    }
}else{
    res.status(400).json({message:"user doesn't have any book borrow"})
}

}

const borrow=async(req,res)=>{

    const book_data = await book.findOne({where: {book_name:req.body.book_name}});

    const user_data = await Users.findOne({where: {email:req.body.email}});
    
    if(book_data.quantity > 0 && book_data.availability_status=="yes" && user_data.borrowbook_qty+1 <= 3 ){
        user_data.borrowbook_qty=user_data.borrowbook_qty +1;
        user_data.save();
        let today = new Date().toISOString().slice(0, 10);
        const borrowData=await books.create({borrow_book:req.body.borrow_book,borrow_date:today,booklistId:book_data.id,RegReaderId:user_data.id});
        const qty=await book.update({quantity:book_data.quantity - 1},{where:{book_name:book_data.book_name}})
        if(qty){
            res.status(200).json({success:borrowData});
        }else{
            res.status(400).json({message:"can't able to update qty"})
        }
    }else{
        res.status(400).json({message:"can't able to borrow"})
    }

}

const returnbook=async(req,res)=>{

    const user_data = await Users.findOne({where: {email:req.body.email}});

    const book_data = await book.findOne({where: {book_name:req.body.book_name}});

      if(book_data.quantity < 10 && book_data.availability_status=="yes" && user_data.borrowbook_qty-1 <= 3){
        user_data.borrowbook_qty=user_data.borrowbook_qty -1;
        user_data.save();

        const returnData = await books.update({return_book:req.body.return_book,return_date:req.body.return_date},
            {where:{RegReaderId:user_data.id,booklistId:book_data.id}});
          console.log(returnData.return_book)

        const qty=await book.update({quantity:book_data.quantity + 1},{where:{book_name:book_data.book_name}})
        if(qty){
            res.status(200).json({success:returnData});
        }else{
            res.status(400).json({message:"can't able to update qty"})
        }

        
      }else{
        res.status(400).json({message:"can't able to return book "})
      }  

    }

    const recommendbook=async(req,res)=>{

        const user_data = await Users.findOne({where: {email:req.body.email}});

        const book_data = await book.findOne({where: {book_name:req.body.book_name}});
    
        if(user_data || book_data ){
    
        const recommendData = await books.update({recommend:req.body.recommend},
            {where:{RegReaderId:user_data.id,booklistId:book_data.id}
          });

//   const sendmail=await books.findOne({attributes:['recommend']})

          if(recommendData){

            const sendmail=await books.findOne({attributes:['recommend']});

            if(sendmail){
            res.status(200).json({success:recommendData});
            const message=("THIS YOUR USERNAME :-" + book_data.book_name + "\n" + " BOOK LINK:-"  );
            const email=sendmail.recommend
          mailer(email,message,subject=("MY FAVOURITE BOOK"));
            console.log(sendmail.recommend)
            }else{
                res.status(400).json({message:"sendmail error"})
              }
            
          }else{
            res.status(400).json({message:"error"})
          }

        }else{
            res.status(400).json({message:"fill user and book details"})
        }
    
     }

        const ratebook=async(req,res)=>{

           const user_data = await Users.findOne({where: {email:req.body.email}});

        const book_data = await book.findOne({where: {book_name:req.body.book_name}});
    
        if(user_data && book_data ){
            
        
            const ratingData = await books.update({rate_book:req.body.rate_book},
                {where:{RegReaderId:user_data.id,booklistId:book_data.id}
              });
        
              if(ratingData){
                res.status(200).json({success:ratingData});
                console.log(ratingData.rate_book)

                
              }else{
                res.status(400).json({message:"cant able to rate book"})
              }

            }else{
                res.status(400).json({message:"fill user and book details"})
            }

            }    

  const viewpending=async(req,res)=>{

    const user_data = await Users.findOne({where: {email:req.body.email}});

        const book_data = await book.findOne({where: {book_name:req.body.book_name}});
    
        if(user_data && book_data ){

            const viewdays = await books.findOne({
                attributes:["borrow_date","return_date"],
                where:{booklistId:book_data.id,RegReaderId:user_data.id}})
        
                const oneDay =  24 * 60 * 60 * 1000;
                const borrow1=new Date(viewdays.borrow_date);
                const return1=new Date(viewdays.return_date);
                const diff = return1.getTime() - borrow1.getTime();
                const day = diff/oneDay;
                console.log(day);

        if(!viewdays){
            res.status(400).json({message:"fill user and book details"})
            
        }else{
            res.status(200).json({success:viewdays+" pending days "+day});
        }

    }else{
        res.status(400).json({message:"fill user and book details"})
    }
  }



    const favbook=async(req,res)=>{

        const user_data = await Users.findOne({where: {email:req.body.email}});

        const book_data = await book.findOne({where: {book_name:req.body.book_name}});

        if(user_data || book_data ){

        const favData = await books.update({favourite:favourite=true},
            {where:{RegReaderId:user_data.id,booklistId:book_data.id}});

            if(favData){
                res.status(200).json({success:favData});
                console.log(favData.booklistId)

                
              }else{
                res.status(400).json({message:"cant able to add fav book"})
              }

        }
    else{
        res.status(400).json({message:"fill user and book details"})
    }
    }
    
    
    const removefavbook=async(req,res)=>{

        const user_data = await Users.findOne({where: {email:req.body.email}});

        const book_data = await book.findOne({where: {book_name:req.body.book_name}});

        if(user_data || book_data ){

        const favData = await books.update({favourite:favourite=false},
            {where:{RegReaderId:user_data.id,booklistId:book_data.id}});

            if(favData){
                res.status(200).json({success:favData});
                console.log(favData.booklistId)

                
              }else{
                res.status(400).json({message:"cant able to add fav book"})
              }

        }
    else{
        res.status(400).json({message:"fill user and book details"})
    }
    }


  const listfavbook =async(req,res)=>{

    const user_data = await Users.findOne({where: {email:req.body.email}});

    if(user_data){ 

    const allfavbook = await books.findAll({
        attributes:['booklistId'],
        include:[{

          model:book,
          attributes:['book_name']
          
        }],
        
        where:{favourite:true,RegReaderId:user_data.id }})

    if(allfavbook){

        res.status(200).json({success:allfavbook});

    }else{
        res.status(400).json({message:"can not able access fav book list"})
    }
    }else{
        res.status(400).json({message:"error"})
    }



  }  

    







module.exports = {
    register,
    login,
    UserList,
    emailSend,
    changePassword,
    editUser,
    userBook,
    allborrowedbook,
    borrow,
    returnbook,
    recommendbook,
    ratebook,
    viewpending,
    favbook,
    removefavbook,
    listfavbook,
    jwtkey
}










