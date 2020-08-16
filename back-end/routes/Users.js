const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt  = require('jsonwebtoken')
const bcrypt  = require('bcrypt')

const User = require('../models/User')
const Jira = require('../models/Jira')
const db = require('../database/db')
const controller = require('../controller/jira.controller')

users.use(cors())

process.env.SECRET_KEY = 'secret'

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

    User.findOne({
        where: {
            user_mail: req.body.user_mail
        }
    }).then(user=> {
        console.log('step 1')
            if(!user) {
                console.log('step 2')
                bcrypt.hash(req.body.password, 10, (err, hash) =>  {
                    userData.password = hash
                    User.create(userData).then(user => {
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
                res.send({user_mail:user.user_mail, token: token})
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

users.post('/jiras',(req, res) => {
    db.jira.findOne({
        where: {
             assigned_to: req.body.user_mail
        }
    }).then(jiras => {
        if(jiras){
           res.send({user_mail: jiras.dataValues.assigned_to, jiras: jiras.dataValues})
        }else{
            res.send('No Jiras assigned')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
})

users.post('/jiras',(req, res) => {
    db.jira.findOne({
        where: {
             assigned_to: req.body.user_mail
        }
    }).then(jiras => {
        if(jiras){
           res.send({user_mail: jiras.dataValues.assigned_to, jiras: jiras.dataValues})
        }else{
            res.send('No Jiras assigned')
        }
    }).catch((err)=> {
        res.status(400).json({error : 'request failed due to error- '+ err})
    })
})
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

users.get('/jira/:jid',(req, res) => {
    return controller.getJiraDetailsById(req.params.jid);
})

module.exports = users