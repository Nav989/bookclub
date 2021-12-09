module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("RegReader", {
        name: {
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        surname: {
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        dob: {
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            notNull: true,
        },
        password: {
            type: DataTypes.STRING,
            notNull: true,
            required: true
        },
        user_type: {
            type: DataTypes.STRING,
            required: true,
            notNull: true,
        },
        borrowbook_qty:{
            type: DataTypes.INTEGER,
            defaultValue:0,
            notNull: true,
            required: true 
        }
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })

    return User;

}