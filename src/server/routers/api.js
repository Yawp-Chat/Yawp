const express = require('express');
const loginController = require('../controllers/loginController'); 


const router = express.Router(); 

router.post('/signup',loginController.newUser, (req, res) => {
  return res.status(200).json({ auth: res.locals.valid });
});

router.post('/login', loginController.user, (req, res) => {
  return res.status(200).json({ auth: res.locals.auth }); 
})

module.exports = router; 

