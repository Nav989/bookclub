const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util')
const db = require('../../database/mysql.js');
var mailer = require('../../utils/mailer');
const config = require('../../configuration/config')
const encryption=require('../../utils/encryption');
const logger= require('../../utils/logger')


const Users = db.User;
const newotp = db.otp;
const book = db.Book;



const register = async (req, res) => {

    const { name,surname,dob,email,user_type} = req
    if (req.password === req.cpassword) {

        const password = req.password;
        //hashing of password
        const encryptedPassword =   await encryption.getencryptedPassword(password);
        console.log( encryptedPassword);
        const findemail = await Users.findOne({
            where: {
                email:email
            }
        });

        if(findemail)return false;

        const createData = await Users.create({
            name: name,
            surname: surname,
            dob: dob,
            email: email,
            password: encryptedPassword,
            user_type: user_type
        });

        await createData.save()
       return {createData}

    } else {
        return false
    }

}

const login = async (req, res) => {   

    const { email,password,user_type } = req

    if (!email || !password || !user_type) return false

    const createData = await Users.findOne({
        where: {
            email: req.email,
            user_type: req.user_type
        }
    });
    if (createData) {
        const hash = createData.password;
        //comparing register password and user password
     const matchpassword = await bcrypt.compare(req.password, hash)
        if (!matchpassword) { logger.info(util.format('Invalid Password Found While Login For Email: ', createData.email));
        return false
     }else {
           const genrateToken = await jwt.sign({createData}, config.get('JWT_TOKEN.SECRET'), {expiresIn: config.get('JWT_TOKEN.expireTime')})
                if (!genrateToken) return false;
                return {createData,genrateToken}   
            } 

    } else {
        return false 
    }

}



const emailSend = async (req, res) => {

    const { email} = req;

    if (!email) return false;
    else {

    const findUser = await Users.findOne({
            where: {email: email }
        })

        if (findUser) {

            let otpcode = Math.floor((Math.random() * 10000) + 1);
            let otpData = await newotp.create({
                email: email,
                otp: otpcode,
                expireIn: new Date().getTime() + 60000 * 2
            });

            await otpData.save();

            if (otpData) {                
                console.log(otpData.expireIn)
                const message = ("THIS IS YOUR  OTP " + otpData.otp)
                mailer(otpData.email, message, subject = ("YOUR OTP"));
                return {otpData}
            } else {
                return false
            }
        } else {
            return false
        }

    }

}

const changePassword = async (req, res) => {

    const { email,otp } = req;


    let data = await newotp.findOne({
        where: {
            email: email,
            otp: otp
        }
    })

    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        console.log(data.expireIn + ":" + currentTime)
        if (diff < 0) {  
            return false //time expire
        } else {

            let user = await Users.findOne({
                where: {
                    email: email
                }
            })
            password = req.password;
            //hashing of password
            const encryptedPassword = await encryption.getencryptedPassword(password);
            user.password = encryptedPassword;
            console.log(encryptedPassword);
            user.save();
            if (!user) return false ; //can't find user with email provided
                return{user}
            
        }

    } else {
        
        console.log("invalid otp or email");
        return false  //invalid otp or email
    }
}

//book service


const addbook = async (req, res) => {

    const {
        book_image,
        book_name,
        author_name,
        availability_status,
        page_count,
        description,
        publish_Date,
        quantity
    } = req

   

        const bookData = await book.create({
            book_image: book_image,
            book_name: book_name,
            author_name: author_name,
            availability_status: availability_status,
            page_count: page_count,
            description: description,
            publish_Date: publish_Date,
            quantity: quantity
        });

        await bookData.save()


        if (bookData) {
            return bookData
        } else {

           return false
        }
    


}

const editbook = async (req, res) => {

    const {
        book_image,
        book_name,
        availability_status,
        page_count,
        description,
        publish_Date,
        quantity
    } = req



    const bookData = await book.update({
        book_image: book_image,
        book_name: book_name,
        availability_status: availability_status,
        page_count: page_count,
        description: description,
        publish_Date: publish_Date,
        quantity: quantity
    }, {
        where: {
            author_name: req.author_name
        }
    });

    if (bookData) {
        
        return bookData
    } else {

       return false

    }
}

const booklist = async (req, res) => {
    const bookData = await book.findAll({
        attributes: ['book_image', 'book_name', 'author_name', 'quantity'],
        where: {
            author_name: req.author_name
        }
    });

    if (bookData) {
       return bookData
    } else {
         return false
    }
}



module.exports = {
    register,
    login,
    emailSend,
    changePassword,
    addbook,
    editbook,
    booklist,
}

