const express = require('express');
const router = express.Router();
const socketObj = require('../config/socketObj');
let player1 = '',
    player2 = '';

module.exports = router;

module.exports = function (io){
  let  currentUser = '',
       connections = {};
  router.get('/', function (req,res) {
    res.render('index');
  });

  router.get('/signup', function ( req, res ) {
    res.render('signup', {
      error: req.flash('error'),
      signupMessage: req.flash('signupMessage')
    });
  });

  router.get('/login', function ( req, res ) {
    res.render('login', {
      error: req.flash('error'),
      loginMessage: req.flash('loginMessage')
    });
  });

  router.get('/dashboard', isLoggedIn,  function (req,res){
    currentUser = req.user;
    let numberOfPlayersOnline = Object.keys(connections).length;


    if (numberOfPlayersOnline % 2 === 0){
      player1 = currentUser;
    } else if (numberOfPlayersOnline % 2 !== 0) {
      player2 = currentUser
    }
    res.render('dashboard', {
      message: req.flash('message'),
      player1: player1,
      player2: player2
    });
  });

  io.on('connection', function (socket){
    let username = currentUser.username;
        id = socket.id;
      socketObj.addConnection(username, id, function () {
      console.log('connection added', socketObj.connections[username]);
    });

    connections = socketObj.getAllConnections();

    socket.on('disconnect', function(){
      socketObj.deleteConnection(username, function(){
        console.log(`Connection removed for username ${username}`);
      });//end of deleteConnection
    });//end of socket disconnect
  });//end of socket on connection



  return router;
};




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
