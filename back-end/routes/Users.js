const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt  = require('jsonwebtoken')
const bcrypt  = require('bcrypt')

const User = require('../models/User')
const Jira = require('../models/Jira')
const db = require('../database/db')
const jiraController = require('../controller/jira.controller')
const userController = require('../controller/user.controller')

users.use(cors())

process.env.SECRET_KEY = 'secret'

/**
 * Api to register new user
 */
users.post('/register', (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_mail: req.body.user_mail,
        user_name: req.body.user_name,    
        password: req.body.password,
        is_active: req.body.is_active

    }

    db.user.findOne({
        where: {
            user_mail: req.body.user_mail
        }
    }).then(user=> {
        console.log('step 1')
            if(!user) {
                console.log('step 2')
                bcrypt.hash(req.body.password, 10, (err, hash) =>  {
                    userData.password = hash
                    db.user.create(userData).then(user => {
                        res.json({ status: user.user_mail + 'registered.'})
                    }).catch(err => {
                        res.send('error: ' + err)
                    })
                })
            }
            else {
                res.json({error : 'user already exists'}) 
            }
    }).catch(err => {
        res.send('error ' + err)
    })
})

/**
 * Api to login a user
 */
users.post('/login',(req, res) => {
    db.user.findOne({
        where: {
             user_mail: req.body.user_mail
        }
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440
                })
                //res.send(token)
                res.send({user_mail:user.user_mail, first_name:user.first_name, last_name: user.last_name, token: token})
            }else{
                res.status(401).json({error : 'Invalid user credentials'})
            }
        }else{
            res.status(400).json({error : 'user not found'})
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
})

/**
 * Api to find all the jiras of a logged in user.
 */
users.post('/jiras',(req, res) => {
    db.jira.findAll({
        where: {
             assigned_to: req.body.user_mail
        }
    }).then(jiras => {
        if(jiras){
            const jiraList = []
            jiras.forEach(j => {
                jiraList.push(j.dataValues)
            })
           res.send({user_mail: req.body.user_mail, jiras: jiraList})
        }else{
            res.send('No Jiras assigned')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
})

/**
 * Api to get the details of the jira based on jira id/ticket id.
 */
users.get('/jira/:jid',(req,res) => {
    db.jira.findByPk(req.params.jid, {include : 'comment'})
    .then(jiras => {
        if(jiras){
           res.send({user_mail: jiras.dataValues.assigned_to, jiras: jiras.dataValues})
        }else{
            res.send('No Jiras assigned')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
});

/**
 * Api to find all the users in the system.
 */
users.get('/all',(req,res) => {
    db.user.findAll()
    .then(users => {
        if(users){
           res.send({users: users})
        }else{
            res.send('No users found')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
}); 


/**
 * Api to update the jira againts the jira/ticket id
 */
users.put('/jira/',(req,res) => {
    db.jira.update(req.body.jira,{
        where:{
            jid: req.body.jira.jid
        }
    })
    .then(jira => {
        if(jira){
           res.send({jira: jira})
        }else{
            res.send('No jira found')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
}); 

/**
 * Api to create a new jira
 */
users.post('/jira/',(req,res) => {
    db.jira.create(req.body.jira)
    .then(jira => {
        if(jira){
           res.send({jira: jira})
        }else{
            res.send('Could not create the jira')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
}); 

/* users.get('/jira/:jid',(req, res) => {
    return jiraController.getJiraDetailsById(req.params.jid);
}) */

users.get('/all', (req,res)=>{
    let users =  userController.getUsers();
    if(users){
        res.send({users:users});
    }else{
        res.send('No Users found')
    }
})

module.exports = users