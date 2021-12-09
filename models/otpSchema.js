module.exports=(sequelize,DataTypes)=>{

    const otpschema = sequelize.define("otp" , {

        email:{
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        otp:{
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        expireIn:{
            type: DataTypes.STRING,
            // required: true
        },
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false  
}
    )

    return otpschema;

}
