module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            uid : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            first_name : {
                type: DataTypes.STRING,
            },
            last_name : {
                type: DataTypes.STRING,
            },
            user_name : {
                type: DataTypes.STRING,
            },
            password : {
                type: DataTypes.STRING,
            },
            user_mail : {
                type: DataTypes.STRING,
            },
            is_active : {
                type: DataTypes.CHAR,
                default: 'Y'
            },
            team:{
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false
        }
    )
    return User;
};
