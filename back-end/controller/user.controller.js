const db = require("../database/db");
const User = db.user;

//create jira
exports.getUsers = () => {
    return User.findAll()
      .then((users) => {
        return users;
      })
      .catch((err) => {
        console.log("Error while loading user: ", err);
      });
  };