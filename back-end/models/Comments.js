module.exports = (sequelize, DataTypes) => {
const Comment = sequelize.define(
    'jira_comments',
    {
        cid : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment : {
            type: DataTypes.STRING,
        },
        added_by : {
            type: DataTypes.STRING,
        },
        add_date : {
            type: DataTypes.DATE
        }
    },
    {
        timestamps: false
    }
)

return Comment;
};