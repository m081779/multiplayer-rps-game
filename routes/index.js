const express = require('express');
const router = express.Router();
const socketObj = require('../config/socketObj');
const roomObj = require('../config/roomObj');


module.exports = router;

module.exports = function (io){
  let  currentUser = '',
       connections = {},
       player1,
       player2,
       room;
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
      message: req.flash('message')
    });
  });

  router.get('/getInfo', function (req,res){
    res.json({roomNumber, currentUser, player1, player2});
  });

  io.on('connection', function (socket){
    let username = currentUser.username;
        id = socket.id;
    //add connection to object that stores usernames and socket id's as property value pairs
    socketObj.addConnection(username, id, function () {
      console.log('connection added', socketObj.connections[username]);
      roomNumber = roomObj.addPlayer(username);//stores room number returned from adding a player
      if (roomObj.rooms[roomNumber].player1===username){
        player1 = username;
        socket.join(roomNumber);
        io.to(roomNumber).emit('player1', {player1,player2});
      } else if (roomObj.rooms[roomNumber].player2===username){
        player2 = username;
        socket.join(roomNumber);
        io.to(roomNumber).emit('player2', {player1,player2});
      }

      socket.on('p1Choice', function (obj){
        console.log(obj, 'player1Choice obj');
        io.to(roomNumber).emit('p1ChoiceMade', {'is': 'working'});
      });

      socket.on('p2Choice', function (obj){
        console.log(obj, 'player2Choice obj');
        io.to(roomNumber).emit('p2ChoiceMade', {'is': 'working'});
      });
      socket.join(roomNumber);
      io.to(roomNumber).emit('player', username);
      console.log(`${username} added to room ${roomNumber}`);
    });

    connections = socketObj.getAllConnections();//gets entire socket object with all connections

    //on disconnect handles removing player from socketObject and from roomObject
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
