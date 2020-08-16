const Sequelize = require('sequelize')
const sequelize = new Sequelize("jira_db", "root","password", {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle: 10000
        
    }    
    
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize


db.jira = require("../models/Jira")(sequelize, Sequelize);
db.comments = require("../models/Comments")(sequelize, Sequelize);
db.user = require("../models/User")(sequelize, Sequelize);

db.jira.hasMany(db.comments, { as: "comment" });
db.comments.belongsTo(db.jira, {
  foreignKey: "jirajid",
  as: "jira"
});

module.exports = db;