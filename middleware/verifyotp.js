const db = require('../database/mysql');

const newotp=db.otp;


module.exports={

     verifyotp:  async(req,res,next)=>{

        const { email , otp } = req.body;
    
       
        let data = await newotp.findOne({ where:{
            email:email,
            otp:otp
        } })

         
        if(data){
            console.log(data.email+ "  : " +data.otp);

            
            let currentTime = new Date().getTime();
            let diff= data.expireIn - currentTime;
            console.log(data.expireIn + ":" +currentTime)
            if(diff < 0){
               res.status(400).json({message:"Time expire"});
               console.log("time expire")
               
            }else{
                res.status(200).json({message:" Otp verifed "});
                // console.log(data);
                next();
            }
                 
        }else{
            console.log("invalid otp and email")
        }
    }   
    


}



