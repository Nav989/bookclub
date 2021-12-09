
module.exports=(sequelize,DataTypes)=>{

    const Book = sequelize.define("booklist" , {

        // book_id:{
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     notNull: true,
        //     primeryKey:true
        // },
        book_image:{
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        book_name:{
            type: DataTypes.STRING,
            unique: true,
            notNull: true,
            required: true
        },
        author_name:{
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        availability_status:{
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        page_count:{
            type: DataTypes.INTEGER,
            notNull: true,
            required: true 
        },
        description:{
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        publish_Date:{
            type: DataTypes.DATEONLY,
            notNull: true,
            required: true

        },
        quantity:{
            type: DataTypes.INTEGER,
            defaultValue:0,
            notNull: true,
            required: true,
        }	
	

        },
        {
            timestamps: true,
            createdAt: false,
            updatedAt: false  
})

    return Book;
}
