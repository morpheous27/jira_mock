const db = require("../database/db");
const Jira = db.jira;
const Comment = db.comments;

//create jira
exports.createJira = (jira) => {
    return Jira.create({
      title: jira.title,
      description: jira.description,
    })
      .then((jira) => {
        console.log("Created Jira: " + jira.jid);
        return jira;
      })
      .catch((err) => {
        console.log("Error while creating jira: ", err);
      });
  };

  //get jira with comments
  exports.getJiraDetailsById = (jid) => {
      return Jira.findByPk(jid)
      .then((jira)=> {
          return jira;
      }).catch((err)=> {
          console.log("error occurred while fetching the details -"+err)
      })
  }