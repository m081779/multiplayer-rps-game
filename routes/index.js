const express = require('express');
const router = express.Router();
const socketObj = require('../config/socketObj');
const roomObj = require('../config/roomObj');
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

    res.render('dashboard', {
      message: req.flash('message'),
      player1: player1,
      player2: player2
    });
  });

  io.on('connection', function (socket){
    let username = currentUser.username;
        id = socket.id;
    //add connection to object that stores usernames and socket id's as property value pairs
    socketObj.addConnection(username, id, function () {
      console.log('connection added', socketObj.connections[username]);
      let roomNumber = roomObj.addPlayer(username);//stores room number returned from adding a player
      let player;
      if (roomObj.rooms[roomNumber].player1===username){
        player = 'player 1';
      } else if (roomObj.rooms[roomNumber].player2===username){
        player = 'player 2';
      }
      console.log(`${username} added as ${player} to room ${roomNumber}`);
    });

    connections = socketObj.getAllConnections();

    socket.on('disconnect', function(){
      socketObj.deleteConnection(username, function(){
        roomObj.deletePlayer(username);
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
