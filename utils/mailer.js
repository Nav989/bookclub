var nodemailer = require('nodemailer');
const config = require('../configuration/config')

const mailer =(email,message,subject)=>{

    var transporter = nodemailer.createTransport({
      host: config.get('mailer.host'),
      port: config.get('mailer.port'),
      secure:false,
      requireTLS:true,
      auth: {
        user: config.get('mailer.email'),
        pass: config.get('mailer.password')
      }
    });
    
    var mailOptions = {
      from: config.get('mailer.supportMail'),
      to: email,
      subject: subject,
      text: message,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    }

    module.exports=mailer
    
