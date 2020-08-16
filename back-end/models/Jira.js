module.exports = (sequelize, DataTypes) => {
const Jira = sequelize.define(
    'jira',
    {
        jid : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title : {
            type: DataTypes.STRING,
        },
        description : {
            type: DataTypes.STRING,
        },
        assigned_to : {
            type: DataTypes.STRING,
        },
        status : {
            type: DataTypes.STRING,
        },
        report_date: {
            type: DataTypes.DATE
        }
    },
    {
        timestamps: false
    }
)
return Jira;
};

