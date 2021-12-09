

module.exports=(sequelize,DataTypes)=>{

    // const range = [
    //     { value: new Date(buying_date), inclusive: false },
    //     { value: new Date(Date.UTC(2021, 12, 13)), inclusive: true },
    //   ];

    const userbook = sequelize.define("userbook" , {

        favourite:{
            type: DataTypes.BOOLEAN,
            notNull: true,
            required: true
        },       
        borrow_book:{
            type: DataTypes.INTEGER,
            notNull: true,
            required: true
        },
        return_book:{
            type: DataTypes.INTEGER,
        },
        recommend:{
            type: DataTypes.STRING
        },
        rate_book:{
            type: DataTypes.FLOAT(5)
        },
        borrow_date:{
            type: DataTypes.DATEONLY,
            notNull: true,
            required: true
        },
        return_date:{
            type:DataTypes.DATEONLY,
            notNull: true,
            required: true
        },
    },
    {
        timestamps: false,
})

return userbook;

    
}