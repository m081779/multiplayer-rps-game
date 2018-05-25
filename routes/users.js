const express = require('express');
const router = express.Router();



module.exports = router;

module.exports = function (passport){
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/main',
    failureRedirect: '/signup',
    failureFlash: 'Invalid username or password.'
  }), function (req,res){
    res.end();
  });
  
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
  }), function (req,res){
    res.end();
  });

  return router;
};