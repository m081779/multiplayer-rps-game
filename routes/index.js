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
    let playerBool;
    let username = currentUser.username;

    roomNumber = roomObj.addPlayer(username);//stores room number returned from adding a player
    if (roomObj.rooms[roomNumber].player1===username){
      player1 = username;
      playerBool = true;
    } else if (roomObj.rooms[roomNumber].player2===username){
      player2 = username;
      playerBool = false;
    }




    io.on('connection', function (socket){
      
      let id = socket.id;
          p1Choice = '',
          p2Choice = '',
          winner = '';

          
      //add connection to object that stores usernames and socket id's as property value pairs
      socketObj.addConnection(username, id, function () {
        console.log('connection added', socketObj.connections[username]);
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
          p1Choice = obj.p1Choice;
          console.log(obj, 'player1Choice obj');
          io.to(roomNumber).emit('p1ChoiceMade', {});
        });
  
        socket.on('p2Choice', function (obj){
          p2Choice = obj.p2Choice;
          console.log(obj, 'player2Choice obj');
          if (p1Choice===p2Choice){
            winner = 'tie';
          } else if (p1Choice==='rock' && p2Choice==='paper'){
            winner = player2;
          } else if (p1Choice==='paper' && p2Choice==='scissors'){
            winner = player2;
          } else if (p1Choice==='scissors' && p2Choice==='rock'){
            winner = player2;
          } else {
            winner =  player1;
          }
          io.to(roomNumber).emit('p2ChoiceMade', {winner});
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









    res.render('dashboard', {
      message: req.flash('message'),
      player1: playerBool
    });
  });//end of get /dashboard

  router.get('/getInfo', function (req,res){
    res.json({roomNumber, currentUser, player1, player2});
  });




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
