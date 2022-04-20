const db = require('../models/model'); 
// const express = require('express'); 
// const res = require('express/lib/response');

loginController = {};

loginController.user = (req, res, next)=> {
  const { username, usersecret} = req.body; 

  const queryString = 'SELECT * FROM Users WHERE username = ($1);'

  db.query(queryString, [username], (err, success) => {
    if (err) {
      return next(
        {
          log:`error in loginController.user ${err}`,
          status:500,
          message: 'there was an error when trying to log in' 
        }
      ); 
    }

    const { rows } = success;

    console.log('success', success);
    console.log('rows', rows)

    // console.log('password in loginController ', rows[0].usersecret, usersecret, rows[0].usersecret === usersecret); 
      
    if (usersecret === rows[0]?.usersecret) {
      res.locals.auth = true; 
      console.log('authenticated pass'); 
      return next(); 
    } else {
      console.log('failed to authenticate')
      res.locals.auth = false; 
      return next(); 
    }

  })
};


loginController.newUser = (req, res, next)=> {
const {username, usersecret } = req.body;

const queryString = 'INSERT INTO Users (username, usersecret) VALUES ($1,$2);'

db.query(queryString,[ username, usersecret], (err,success) => {
  if (err) {

    return next({log: `database says ${err} - unsuccessful attempt to add new user`, status: 500, message:'there was an error in your attempt to sign up'}); 
  }
  else {
    return next(); 

  }
});

}


module.exports = loginController; 



