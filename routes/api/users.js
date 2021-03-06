const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res) => res.send("Hi"))

router.post('/register', (req, res) => {
    // Check to make sure nobody has already registered with a duplicate email
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
     
    User.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          // Throw a 400 error if the email address already exists
          return res.status(400).json({username: "This username already exists!"})
        } else {
          // Otherwise create a new user
          const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
          })
           
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user =>{ 
                    const payload = {
                        id: user.id,
                        username: user.username,
                        name: user.name
                    }
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                             
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        }
                    )
                })
                .catch(err => console.log(err));
            })
          })
        }
      })
  })

router.post('/login', (req, res) => {
    const{ errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    User.findOne({ username })
        .then(user => {
            if(!user) {
                return res.status(404).json({username: "This user does not exit"});
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            id: user.id,
                            username: user.username,
                            name: user.name
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            }
                        )
                    }else{
                        return res.status(400).json( {password: "Incorrect Password"} );
                    }
                })
        })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        name: req.user.name
    });
})

module.exports = router;