const schemas = require('./author-schema')
const author = require('./author-model')
const constants = require('../../utils/constants');
const common = require('../../utils/common')



const register = async (req, res) => {

    const regDetails = common.sanitize(req.body, schemas.register, constants.moduleNames.author);


    if (schemas.validate(regDetails, schemas.register)) {

        const Ifaccess = await author.register(regDetails)


        if (Ifaccess) {
            console.log("Register success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log("Register not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("Register data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}


const login = async (req, res) => {

    const loginDetails = common.sanitize(req.body, schemas.login, constants.moduleNames.author);


    if (schemas.validate(loginDetails, schemas.login)) {

        const Ifaccess = await author.login(loginDetails)


        if (Ifaccess) {
            console.log("login success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log("login not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("login data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}


const emailSend = async (req, res) => {

    const emailDetails = common.sanitize(req.body, schemas.emailSend, constants.moduleNames.author);


    if (schemas.validate(emailDetails, schemas.emailSend)) {

        const Ifaccess = await author.emailSend(emailDetails)


        if (Ifaccess) {
            console.log("eamil send success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log("eamil send not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("eamil  data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}


const changePassword = async (req, res) => {

    const emailDetails = common.sanitize(req.body, schemas.changePassword, constants.moduleNames.author);


    if (schemas.validate(emailDetails, schemas.changePassword)) {

        const Ifaccess = await author.changePassword(emailDetails)


        if (Ifaccess) {
            console.log("password change success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log("password change not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("eamil  data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}

const addbook = async (req, res) => {

    const bookDetails = common.sanitize(req.body, schemas.addbook, constants.moduleNames.author);


    if (schemas.validate(bookDetails, schemas.addbook)) {

        const Ifaccess = await author.addbook(bookDetails)


        if (Ifaccess) {
            console.log(" book added success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" book added not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("eamil  data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}


const editbook = async (req, res) => {

    const editbookDetails = common.sanitize(req.body, schemas.editbook, constants.moduleNames.author);


    if (schemas.validate(editbookDetails, schemas.editbook)) {

        const Ifaccess = await author.editbook(editbookDetails)


        if (Ifaccess) {
            console.log(" book edit success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" book edit not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("eamil  data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}

const listbook = async (req, res) => {

    const listbookDetails = common.sanitize(req.body, schemas.listbook, constants.moduleNames.author);


    if (schemas.validate(listbookDetails, schemas.listbook)) {

        const Ifaccess = await author.booklist(listbookDetails)


        if (Ifaccess) {
            console.log(" book list success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" book list not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log("  data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
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