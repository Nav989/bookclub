const express = require("express");
const bodyParser = require("body-parser")
const config = require('./configuration/config')
const routes = require('./routes/index');
const db=require('./database/mysql');
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())

routes(app);

db.sequelize.sync({
    force: false
})
.then(() => [
    console.log("My SQL Tables Synced Successfully.")
]).catch(err => {
    console.log("error" + err)
})


app.listen(process.env.PORT || config.get('server.port'), () => {
    console.log("connected to server")
})



