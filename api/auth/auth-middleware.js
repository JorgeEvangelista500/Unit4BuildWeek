const jwt =require('jsonwebtoken')
const {JWT_SECRET} = require('../secrets/index')
const Users = require('./auth-model')

const usernameExist = async (req, res, next) => {
    const [user] = await Users.findBy({ username: req.body.username})
    if(user){
        req.user = user
        next()
    } else {
        next({ status:401, message: 'invalid credentials'})
    }
}

const usernameFree = async (req, res, next) => {
    const [user] = await Users.findBy({ username: req.body.username})
    if(!user){
        next()
    } else {
        next ({ status:422, message: 'username taken' })
    }
}

const checkUserData = (req, res, next) => {
    if(!req.body.username){
        next({ status:401, message: "username and password required"})
    } else if (!req.body.password) {
        next({ status:401, message: "username and password required"})
    } else {
        next()
    }
}

const restrict = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
      next({ status:401, message: "token required" })
    } else {
      jwt.verify(token, JWT_SECRET, (err) => {
        if(err){
          next({status:401, message: "token invalid" })
        } else {
          next()
        }
      })
    }
}

module.exports = {
    usernameExist,
    usernameFree,
    checkUserData,
    restrict
}