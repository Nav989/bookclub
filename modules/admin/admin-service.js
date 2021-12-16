const schemas = require('./admin-schema')
const admin = require('./admin-model')
const constants = require('../../utils/constants');
const common = require('../../utils/common')




const  userlist  = async (req, res) => {


        const Ifaccess = await admin.userlist()


        if (Ifaccess) {
            console.log(" success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" not success ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

}

const createUser = async (req, res) => {

    const regDetails = common.sanitize(req.body, schemas.createUser, constants.moduleNames.admin);


    if (schemas.validate(regDetails, schemas.createUser)) {

        const Ifaccess = await admin.createUser(regDetails)


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

const editUser = async (req, res) => {

    const editDetails = common.sanitize(req.body, schemas.editUser, constants.moduleNames.admin);


    if (schemas.validate(editDetails, schemas.editUser)) {

        const Ifaccess = await admin.editUser(editDetails)


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


const searchUser = async (req, res) => {

    const searchDetails = common.sanitize(req.params, schemas.searchUser, constants.moduleNames.admin);


    if (schemas.validate(searchDetails, schemas.searchUser)) {

        const Ifaccess = await admin.searchUser(searchDetails)


        if (Ifaccess) {
            console.log(" success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" unsuccessful ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log(" data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}


const filterUser = async (req, res) => {

    const searchDetails = common.sanitize(req.params, schemas.filterUser, constants.moduleNames.admin);


    if (schemas.validate(searchDetails, schemas.filterUser)) {

        const Ifaccess = await admin.filterUser(searchDetails)


        if (Ifaccess) {
            console.log(" success ");
            res.status(200).json({
                success: Ifaccess
            });
        } else {
            console.log(" unsuccessful ")
            res.status(400).json({
                message: "wrong creditional"
            });
        }

    } else {
        console.log(" data not validate ")
        res.status(400).json({
            message: "please filled the data"
        });
    }
}



const  booklist  = async (req, res) => {


    const Ifaccess = await admin.booklist()


    if (Ifaccess) {
        console.log(" success ");
        res.status(200).json({
            success: Ifaccess
        });
    } else {
        console.log(" not success ")
        res.status(400).json({
            message: "wrong creditional"
        });
    }

}


const updatebook = async (req, res) => {

    const editDetails = common.sanitize(req.body, schemas.editbook, constants.moduleNames.admin);


    if (schemas.validate(editDetails, schemas.editbook)) {

        const Ifaccess = await admin.updatebook(editDetails)


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


const deletebook = async (req, res) => {

    const delDetails = common.sanitize(req.body, schemas.deletebook, constants.moduleNames.admin);


    if (schemas.validate(delDetails, schemas.deletebook)) {

        const Ifaccess = await admin.deletebook(delDetails)


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




module.exports={
    userlist,
    createUser,
    editUser,
    searchUser,
    filterUser,
    booklist,
    updatebook,
    deletebook
}