const util = require('util')
const schemas = require('./author-schema')
const author = require('./author-model')
const constants = require('../../utils/constants');
const common = require('../../utils/common')
const logger= require('../../utils/logger')




const register = async (req, res) => {

    const regDetails = common.sanitize(req.body, schemas.register, constants.moduleNames.author);


    if (schemas.validate(regDetails, schemas.register)) {

        const Ifaccess = await author.register(regDetails)


        if (Ifaccess) {
        logger.info(util.format('Register success : ', Ifaccess.createData.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_alreadyExists,
                data: Ifaccess
              })
        }

    } else {
        logger.error(util.format('schema is not validated : ', regDetails));
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const login = async (req, res) => {

    const loginDetails = common.sanitize(req.body, schemas.login, constants.moduleNames.author);


    if (schemas.validate(loginDetails, schemas.login)) {

        const Ifaccess = await author.login(loginDetails)


        if (Ifaccess) {
            logger.info(util.format('login success : ', Ifaccess.createData.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            logger.info(util.format('login is unsuccessful : ', Ifaccess.createData.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid,
                data: Ifaccess
              })
        }

    } else {
        logger.error(util.format('schema is not validated : ', loginDetails));
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const emailSend = async (req, res) => {

    const emailDetails = common.sanitize(req.body, schemas.emailSend, constants.moduleNames.author);


    if (schemas.validate(emailDetails, schemas.emailSend)) {

        const Ifaccess = await author.emailSend(emailDetails)


        if (Ifaccess) {
          logger.info(util.format('eamil send successfully  : ', Ifaccess.otpData.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
             logger.info(util.format('eamil not send  : ', Ifaccess.otpData.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_email,
                data: Ifaccess
              })
        }

    } else {
       logger.error(util.format('schema is not validated : ', emailDetails));
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}


const changePassword = async (req, res) => {

    const emailDetails = common.sanitize(req.body, schemas.changePassword, constants.moduleNames.author);


    if (schemas.validate(emailDetails, schemas.changePassword)) {

        const Ifaccess = await author.changePassword(emailDetails)


        if (Ifaccess) {
          logger.info(util.format('password change success  : ', Ifaccess.user.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
          logger.info(util.format('password change not success  : ', Ifaccess.user.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.invalidOTP,
                message: constants.messageKeys.en.msg_invalid_OTP,
                data: Ifaccess
              })
        }

    } else {
        logger.error(util.format('schema is not validated : ', emailDetails));
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}

const addbook = async (req, res) => {

    const bookDetails = common.sanitize(req.body, schemas.addbook, constants.moduleNames.author);


    if (schemas.validate(bookDetails, schemas.addbook)) {

        const Ifaccess = await author.addbook(bookDetails)


        if (Ifaccess) {
         logger.info(util.format(' book added successfully : ', Ifaccess.user.book_name));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
         logger.info(util.format(' book not added successfully : ', Ifaccess.user.book_name));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_failed,
                data: Ifaccess
              })
        }

    } else {
        logger.error(util.format('schema is not validated : ', bookDetails));
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          });
    }
}


const editbook = async (req, res) => {

    const editbookDetails = common.sanitize(req.body, schemas.editbook, constants.moduleNames.author);


    if (schemas.validate(editbookDetails, schemas.editbook)) {

        const Ifaccess = await author.editbook(editbookDetails)


        if (Ifaccess) {
           logger.info(util.format(' book edit  successfully : ', Ifaccess.user.book_name));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            logger.info(util.format(' book not edit  successfully : ', Ifaccess.user.book_name));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_author,
                data: Ifaccess
              })
        }

    } else {
        logger.error(util.format('schema is not validated : ', editbookDetails));
        res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate,
            data: {}
          })
    }
}

const listbook = async (req, res) => {

    const listbookDetails = common.sanitize(req.body, schemas.listbook, constants.moduleNames.author);


    if (schemas.validate(listbookDetails, schemas.listbook)) {

        const Ifaccess = await author.booklist(listbookDetails)


        if (Ifaccess) {
            logger.info(util.format(' book list successfully : ', Ifaccess.user.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.successfulOperation,
                message: constants.messageKeys.en.msg_success,
                data: Ifaccess
              })
        } else {
            logger.info(util.format(' book list not successfully : ', Ifaccess.user.email));
            res.status(constants.httpStatusCode.success).send({
                code: constants.responseCodes.failedOperation,
                message: constants.messageKeys.en.msg_invalid_author,
                data: Ifaccess
              });
        }

    } else {
        logger.error(util.format('schema is not validated : ', listbookDetails));
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
    addbook,
    editbook,
    listbook
}


