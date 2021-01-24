const express = require("express")
const router = express.Router();


module.exports = router;
module.exports = function(passport){
//     // router.post('/signup', passport.authenticate('local-signup', {
//     //     successRedirect: '/dashboard',
//     //     failureRedirect: '/signup'
//     //   }), function (req,res){
//     //     res.end();
//     //   });
        router.post('/login', (req,res) => {
            res.send(req.body);
        })
    //    router.post('/login', 
    //    passport.authenticate('local-login', {
    //      successRedirect: '/dashboard',
    //      failureRedirect: '/login'
    //    }), 
    //    function (req,res){
    //        console.log('firing', req.body);
    //      res.send('yo');
    //    });
    
//     //   router.get('/logout', function(req, res) {
//     //     req.logout();
//     //     req.session.destroy(function (err) {
//     //       if (!err) {
//     //         res.clearCookie('connect.sid', {path: '/'}).redirect('/');
//     //       } else {
//     //         console.log('Error from session destroy:', err);
//     //       }
//     //     });
//     //   });
    
    
//     // router.get('/signup', function ( req, res ) {
//     //     res.render('signup', {
//     //       error: req.flash('error'),
//     //       signupMessage: req.flash('signupMessage')
//     //     });
//     //   });
    
      router.get('/login', function ( req, res ) {
        
        res.send('ok');
//     //     // res.render('login', {
//     //     //   error: req.flash('error'),
//     //     //   loginMessage: req.flash('loginMessage')
//     //     // });
      });
      // } 
      
      
      
      
      //   // route middleware to make sure a user is logged in
      //  isLoggedIn = (req, res, next) => {
          
          //     // if user is authenticated in the session, carry on
          //     if (req.isAuthenticated())
          //         return next();
          
          //     // if they aren't redirect them to the home page
          //     res.redirect('/');
          return router;
  };