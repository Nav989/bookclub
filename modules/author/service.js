const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../database/mysql.js');
var mailer = require('../../utils/mailer');
const config = require('../../configuration/config');

const Users = db.User;
const book = db.Book;
const newotp = db.otp;


const register = async (req, res) => {
    if (req.body.password === req.body.cpassword) {

        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, config.get('server.security.salt'))
        console.log(encryptedPassword);

        const createData = await Users.create({
            name: req.body.name,
            surname: req.body.surname,
            dob: req.body.dob,
            email: req.body.email,
            password: encryptedPassword,
            user_type: req.body.user_type
        });

        await createData.save()
        res.status(201).send(createData)
    } else {
        res.status(400).json({
            message: "password & cP not same"
        })
    }

}

const login = async (req, res) => {

    const {
        email,
        password,
        user_type
    } = req.body;

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

        bcrypt.compare(password, hash, function (err, result) {
            if (err) throw err
            else if (result) {

                jwt.sign({
                    createData
                }, config.get('JWT_TOKEN.SECRET'), {
                    expiresIn: config.get('JWT_TOKEN.expireTime')
                }, (err, token) => {
                    if (err) throw err;
                    res.status(201).json({
                        success: createData,
                        token
                    })
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

const emailSend = async (req, res) => {

    const {
        email
    } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "please filled the data"
        })
    } else {

        const findUser = await Users.findOne({
            where: {
                email: email
            }
        })

        if (findUser) {

            let otpcode = Math.floor((Math.random() * 10000) + 1);
            let otpData = await newotp.create({
                email: req.body.email,
                otp: otpcode,
                expireIn: new Date().getTime() + 60000 * 2
            });

            await otpData.save();

            if (otpData) {
                res.status(200).json({
                    success: otpData
                });
                console.log(otpData.expireIn)
                const message = ("THIS IS YOUR  OTP " + otpData.otp)
                mailer(otpData.email, message, subject = ("YOUR OTP"));
            } else {

                res.status(400).json({
                    message: "not created"
                })

            }
        } else {

            res.status(400).json({
                message: "WRONG EMAIL ID "
            })

        }
     }
}

const changePassword = async (req, res) => {

    const {
        email,
        otp
    } = req.body;

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
            res.status(400).json({
                message: "Time expire"
            });
            console.log("time expire")

        } else {

            let user = await Users.findOne({
                where: {
                    email: email
                }
            })
            password = req.body.password;
            //hashing of password
            const encryptedPassword = await bcrypt.hash(password, config.get('server.security.salt'))
            user.password = encryptedPassword;
            console.log(encryptedPassword);
            user.save();
            if (!user) {
                res.status(400).json({
                    message: "error"
                });
            } else {
                res.status(200).json({
                    success: user
                });
            }
        }

    } else {
        res.status(400).json({
            message: "invalid otp or email"
        });
        console.log("invalid otp or email")
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
    } = req.body

    if (!book_image || !book_name || !author_name || !availability_status || !page_count || !description || !publish_Date || !quantity) {
        return res.status(400).json({
            error: "please filled the data"
        })
    } else {

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
            res.status(200).json({
                success: bookData
            });
        } else {

            res.status(400).json({
                message: "not added books"
            })

        }
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
    } = req.body



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
            author_name: req.body.author_name
        }
    });

    if (bookData) {
        res.status(200).json({
            success: bookData
        });
        console.log(bookData.quantity)
    } else {

        res.status(400).json({
            message: "can't edited books"
        })

    }
}

const booklist = async (req, res) => {
    const bookData = await book.findAll({
        attributes: ['book_image', 'book_name', 'author_name', 'quantity'],
        where: {
            author_name: req.body.author_name
        }
    });

    if (bookData) {
        res.status(200).json({
            success: bookData
        });
    } else {

        res.status(400).json({
            message: " can't able get data"
        })

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
