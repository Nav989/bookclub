const jwt = require('jsonwebtoken')
const config = require('../configuration/config')

module.exports = {
    verifyToken: function (req, res, next) {
        let token = req.get('authorization');

        if (token) {
            token = token.slice(7);

            jwt.verify(token,config.get('JWT_TOKEN.SECRET'), async (err, authdata) => {
                if (err) {
                    res.status(400).json({
                        message: err
                    });
                    throw err;
                } else {
                    console.log("User:-", token);
                    console.log(authdata)
                    next();
                }

            })
        } else {
            res.status(403).json({
                message: "authorization failed"
            })
        }
    }

}
