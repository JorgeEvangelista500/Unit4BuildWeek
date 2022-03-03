const bcrypt = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const User = require('./auth-model')
const { usernameExist, usernameFree, checkUserData } = require('./auth-middleware')


router.post('/register',checkUserData, usernameFree, async(req, res, next) => {
    const { username,  password} = req.body
    const hash = bcrypt.hashSync(password, 8)
    User.insertUser({ username, password: hash})
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(next)
})

router.post('/login', usernameExist, (req, res, next) => {
    if(bcrypt.compareSync(req.body.password, req.user.password)){
      const token = generateToken(req.user)
      res.status(200).json({message: `welcome, ${req.user.username}`, token })
    } else {
      next({ status: 401, message:'invalid credentials'})
    }
});

function generateToken(user){
    const payload = {
      subject: user.id,
      username: user.username
    }
    return jwt.sign(payload, JWT_SECRET, {expiresIn:'1d'})
  }

  module.exports = router