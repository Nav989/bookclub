const schemas = require('./user-reqSchema')
const users = require('./user-model')
const constants = require('../../utils/constants');
const common = require('../../utils/common')



const register = async (req, res) => {

    const regDetails = common.sanitize(req.body, schemas.register, constants.moduleNames.user);


    if (schemas.validate(regDetails, schemas.register)) {

        const Ifaccess = await users.register(regDetails)


        if (Ifaccess) {
            console.log("Register success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("user exists ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_alreadyExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("Register data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const login = async (req, res) => {

    const loginDetails = common.sanitize(req.body, schemas.login, constants.moduleNames.user);


    if (schemas.validate(loginDetails, schemas.login)) {

        const Ifaccess = await users.login(loginDetails)


        if (Ifaccess) {
            console.log("login success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("login not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid,
                data: Ifaccess
              })
        }

    } else {
        console.log("login data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const emailSend = async (req, res) => {

    const emailDetails = common.sanitize(req.body, schemas.emailSend, constants.moduleNames.user);


    if (schemas.validate(emailDetails, schemas.emailSend)) {

        const Ifaccess = await users.emailSend(emailDetails)


        if (Ifaccess) {
            console.log("eamil send success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("eamil send not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_email,
                data: Ifaccess
              })
        }

    } else {
        console.log("eamil  data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const changePassword = async (req, res) => {

    const emailDetails = common.sanitize(req.body, schemas.changePassword, constants.moduleNames.user);


    if (schemas.validate(emailDetails, schemas.changePassword)) {

        const Ifaccess = await users.changePassword(emailDetails)


        if (Ifaccess) {
            console.log("password change success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("password change not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.invalidOTP,
                message: constants.messageKeys.en.msg_invalid_OTP,
                data: Ifaccess
              })
        }

    } else {
        console.log("  data is not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const editUser = async (req, res) => {

    const userDetails = common.sanitize(req.body, schemas.editUser, constants.moduleNames.user);


    if (schemas.validate(userDetails, schemas.editUser)) {

        const Ifaccess = await users.editUser(userDetails)


        if (Ifaccess) {
            console.log("updated user success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("updated user not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_email,
                data: Ifaccess
              })
        }

    } else {
        console.log("updated user not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const allborrowedbook = async (req, res) => {

    const bookDetails = common.sanitize(req.body, schemas.allborrowedbook, constants.moduleNames.user);


    if (schemas.validate(bookDetails, schemas.allborrowedbook)) {

        const Ifaccess = await users.allborrowedbook(bookDetails)


        if (Ifaccess) {
            console.log("view all book borrow success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("  can't view all book borrow  ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_email,
                data: Ifaccess
              })
        }

    } else {
        console.log("please filled the data")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}

const borrow = async (req, res) => {

    const borrowBook = common.sanitize(req.body, schemas.borrow, constants.moduleNames.user);


    if (schemas.validate(borrowBook, schemas.borrow)) {

        const Ifaccess = await users.borrow(borrowBook)


        if (Ifaccess) {
            console.log(" book borrow successfully ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("  can't able to borrow book ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("please filled the data")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const returnbook = async (req, res) => {

    const returnBook = common.sanitize(req.body, schemas.returnBook, constants.moduleNames.user);


    if (schemas.validate( returnBook, schemas.returnBook)) {

        const Ifaccess = await users.returnbook( returnBook)


        if (Ifaccess) {
            console.log(" book retun successfully ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("  can't able to return book ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("please filled the data")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const  viewpending  = async (req, res) => {

    const pendingDays = common.sanitize(req.body, schemas.viewDays, constants.moduleNames.user);


    if (schemas.validate( pendingDays, schemas.viewDays)) {

        const Ifaccess = await users.viewpending( pendingDays)


        if (Ifaccess) {
            console.log(" pending days  ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("  can't able to see pending days  ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("please filled the data")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}

const  recommendbook  = async (req, res) => {

    const recommendDetails = common.sanitize(req.body, schemas.recommendbook, constants.moduleNames.user);


    if (schemas.validate( recommendDetails, schemas.recommendbook)) {

        const Ifaccess = await users.recommendbook( recommendDetails)


        if (Ifaccess) {
            console.log(" recommended book  ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log("  can't able to see recommended book  ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("please filled the data")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}



const ratebook = async (req, res) => {

    const ratingData = common.sanitize(req.body, schemas.ratebook, constants.moduleNames.user);


    if (schemas.validate(ratingData, schemas.ratebook)) {

        const Ifaccess = await users.ratebook(ratingData)


        if (Ifaccess) {
            console.log("success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log(" not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("login data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const favbook = async (req, res) => {

    const favData = common.sanitize(req.body, schemas.favbook, constants.moduleNames.user);


    if (schemas.validate(favData, schemas.favbook)) {

        const Ifaccess = await users.favbook(favData)


        if (Ifaccess) {
            console.log("success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log(" not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
        console.log("login data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const removefavbook = async (req, res) => {

    const returnfavData = common.sanitize(req.body, schemas.removefavbook, constants.moduleNames.user);


    if (schemas.validate(returnfavData, schemas.removefavbook)) {

        const Ifaccess = await users.removefavbook(returnfavData)


        if (Ifaccess) {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_notExists,
                data: Ifaccess
              })
        }

    } else {
         res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const listfavbook = async (req, res) => {

    const listfavData = common.sanitize(req.body, schemas.listfavbook, constants.moduleNames.user);


    if (schemas.validate(listfavData, schemas.listfavbook)) {

        const Ifaccess = await users.listfavbook(listfavData)


        if (Ifaccess) {
            console.log("success ");
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            console.log(" not success ")
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_email,
                data: Ifaccess
              })
        }

    } else {
        console.log("login data not validate ")
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }    
}



module.exports = {
    login,
    register,
    emailSend,
    changePassword,
    editUser,
    allborrowedbook,
    borrow,
    returnbook,
    viewpending,
    recommendbook,
    ratebook,
    favbook,
    removefavbook,
    listfavbook
}