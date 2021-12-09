var nodemailer = require('nodemailer');


const mailer =(email,message,subject)=>{


    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth: {
        user: 'navneetdubey989@gmail.com',
        pass: 'xmvu bxri ulvj asbf'
      }
    });
    
    var mailOptions = {
      from: 'navneetdubey989@gmail.com',
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
    