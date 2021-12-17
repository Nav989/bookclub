const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../database/mysql.js');
var mailer = require('../../utils/mailer');
const config = require('../../configuration/config')
// const schemas=require('./user-reqSchema');
const encryption=require('../../utils/encryption')

const Users = db.User;

const newotp = db.otp;

const book = db.Book;

const books = db.userbook;


const register = async (req, res) => {

    const { name,surname,dob,email,user_type} = req
    if (req.password === req.cpassword) {

        const password = req.password;
        //hashing of password
        const encryptedPassword =   await encryption.getencryptedPassword(password);
        console.log( encryptedPassword);

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
        if (!matchpassword) return false
            else {
           const genrateToken = await jwt.sign({createData}, config.get('JWT_TOKEN.SECRET'), {expiresIn: config.get('JWT_TOKEN.expireTime')})
                if (!genrateToken) return false;
                return {createData,genrateToken}   
            } 

    } else {
        return false 
    }

}


const UserList = async (req, res) => {

    const {email } = req.body;

    const findUser = await Users.findOne({
        where: {
            email: email
        }
    })

    if (findUser) {

        res.status(200).json(findUser);
    } else {

        res.status(400).json({
            message: "error "
        })

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

const editUser = async (req, res) => {

    const { name, surname, dob, email, user_type} = req

    const Userdata = await Users.update({
        name: name,
        surname: surname,
        dob: dob,
        user_type
    }, {
        where: {
            email: email
        }
    });

    if (Userdata) {
        return {Userdata}
    } else {
        return false
    }
}

const userBook = async (req, res) => {

    const {
        favourite,
        borrow_book,
        return_book,
        recommend,
        rate_book,
        buying_date,
        return_date,
        RegReaderId
    } = req.body;

    const takebook = await books.create({
        favourite: favourite,
        borrow_book: borrow_book,
        return_book: return_book,
        recommend: recommend,
        rate_book: rate_book,
        buying_date: buying_date,
        return_date: return_date,
        RegReaderId: RegReaderId
    })


    if (takebook) {
        res.status(200).json({
            success: takebook
        });
    } else {

        res.status(400).json({
            message: "not created"
        })

    }

}

const allborrowedbook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    if (user_data) {

        const allborrow = await books.findAll({
            attributes: ['booklistId'],
            include: [{

                model: book,
                attributes: ['book_name']

            }],

            where: {
                borrow_book: true,
                RegReaderId: user_data.id
            }
        })

        if (allborrow) {

            return { allborrow}

        } else {
            return false
        }
    } else {
        return false   //user doesn't have any book borrow
    }

}

const borrow = async (req, res) => {

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    if (book_data.quantity > 0 && book_data.availability_status == "yes" && user_data.borrowbook_qty + 1 <= 3) {
        user_data.borrowbook_qty = user_data.borrowbook_qty + 1;
        user_data.save();
        let today = new Date().toISOString().slice(0, 10);
        const borrowData = await books.create({
            borrow_book: req.borrow_book,
            borrow_date: today,
            booklistId: book_data.id,
            RegReaderId: user_data.id
        });
        const qty = await book.update({
            quantity: book_data.quantity - 1
        }, {
            where: {
                book_name: book_data.book_name
            }
        })
        if (qty) {
            // res.status(200).json({
            //     success: borrowData
            // });
            return { borrowData}
        } else {
            // res.status(400).json({
            //     message: "can't able to update qty"
            // })
            return false
        }
    } else {
        // res.status(400).json({
        //     message: "can't able to borrow"
        // })
        return false
    }

}

const returnbook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    if (book_data.quantity < 10 && book_data.availability_status == "yes" && user_data.borrowbook_qty - 1 <= 3) {
        user_data.borrowbook_qty = user_data.borrowbook_qty - 1;
        user_data.save();

        const returnData = await books.update({
            return_book: req.return_book,
            return_date: req.return_date
        }, {
            where: {
                RegReaderId: user_data.id,
                booklistId: book_data.id
            }
        });
        console.log(returnData.return_book)

        const qty = await book.update({
            quantity: book_data.quantity + 1
        }, {
            where: {
                book_name: book_data.book_name
            }
        })
        if (qty) {
            // res.status(200).json({
            //     success: returnData
            // });

            return returnData
        } else {
            // res.status(400).json({
            //     message: "can't able to update qty"
            // })

            return false
        }


    } else {
        // res.status(400).json({
        //     message: "can't able to return book "
        // })
        return false
    }

}



const viewpending = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    if (user_data && book_data) {

        const viewdays = await books.findOne({
            attributes: ["borrow_date", "return_date"],
            where: {
                booklistId: book_data.id,
                RegReaderId: user_data.id
            }
        })

        const oneDay = 24 * 60 * 60 * 1000;
        const borrow1 = new Date(viewdays.borrow_date);
        const return1 = new Date(viewdays.return_date);
        const diff = return1.getTime() - borrow1.getTime();
        const day = diff / oneDay;
        console.log(day);

        if (!viewdays) {
            return false
        } else {
            return { success: viewdays + " pending days " + day }
        }

    } else {
       return false
    }
}




const recommendbook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    if (user_data || book_data) {

        const recommendData = await books.update({
            recommend: req.recommend
        }, {
            where: {
                RegReaderId: user_data.id,
                booklistId: book_data.id
            }
        });



        const sendmail = await books.findOne({
            attributes: ['recommend'],
            where: {
                RegReaderId: user_data.id,
                booklistId: book_data.id
            }
        });

        if (sendmail) {
            
            const message = ("THIS IS MY FAVORITE BOOK RECOMMED YOU :-" + book_data.book_name + "\n" + " BOOK LINK:- " + "localhost:5000/book/details");
            const email = sendmail.recommend
            mailer(email, message, subject = ("MY FAVOURITE BOOK"));
            console.log(sendmail.recommend)
            return recommendData
        } else {
            return false
        }

    } else {
        return false
    }

}

const ratebook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    if (user_data && book_data) {


        const ratingData = await books.update({
            rate_book: req.rate_book
        }, {
            where: {
                RegReaderId: user_data.id,
                booklistId: book_data.id
            }
        });

        if (ratingData) {
           return ratingData

        } else {
           return false
        }

    } else {
        return false
    }

}


const favbook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    if (user_data || book_data) {

        const favData = await books.update({
            favourite: favourite = true
        }, {
            where: {
                RegReaderId: user_data.id,
                booklistId: book_data.id
            }
        });

        if (favData) return {favData} 
    } else {
       return false
    }
}


const removefavbook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    const book_data = await book.findOne({
        where: {
            book_name: req.book_name
        }
    });

    if (user_data || book_data) {

        const UnfavData = await books.update({
            favourite: favourite = false
        }, {
            where: {
                RegReaderId: user_data.id,
                booklistId: book_data.id
            }
        });

        if (UnfavData)  {return UnfavData;}
        return false;
        

    } else {
       return false
    }
}


const listfavbook = async (req, res) => {

    const user_data = await Users.findOne({
        where: {
            email: req.email
        }
    });

    if (user_data) {

        const allfavbook = await books.findAll({
            attributes: ['booklistId'],
            include: [{

                model: book,
                attributes: ['book_name']

            }],

            where: {
                favourite: true,
                RegReaderId: user_data.id
            }
        })

        if (allfavbook) return allfavbook
    } else {
        return false
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
    listfavbook
}