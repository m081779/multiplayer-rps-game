const express = require('express');
const router = express.Router();



module.exports = router;

module.exports = function (passport){
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
    // failureFlash: 'Invalid username or password.'
  }), function (req,res){
    res.end();
  });
  
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
    // failureFlash: 'Invalid username or password.'
  }), function (req,res){
    res.end();
  });

  router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy(function (err) {
      if (!err) {
        res.clearCookie('connect.sid', {path: '/'}).redirect('/');
      } else {
        console.log('Error from session destroy:', err);
      }
    });
  });

  return router;
};