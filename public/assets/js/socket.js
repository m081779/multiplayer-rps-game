if (typeof socket !== "undefined"){
  let player1,
      player2;
  socket.on('player1', function(data){

    $('#p1Username').text(data.player1);
    if(typeof data.player2 === 'undefined'){
      $('#p2Username').text('Waiting for player 2');
    }
  });
  socket.on('player2', function(data){
    player1 = data.player1;
    player2 = data.player2;
    $('#p1Username').text(data.player1);
    $('#p2Username').text(data.player2);
    $('#messageHeader').text('Are you ready to play?');
    setTimeout(function (){
      $('#messageHeader').text('Let\'s begin!');
      $('#messageText').text('Player 1 make your choice...');
      $('#p1Choices').show();
    }, 2000);
  });

  socket.on('p1ChoiceMade', function (data){
    $('#p1Choices').hide();
    $('#p2Choices').show();
    $('#messageHeader').text('Nice choice player 1!');
    $('#messageText').text('Player 2 make your choice...');
  });

  socket.on('p2ChoiceMade', function (data){
    $('#p2Choices').hide();
    $('#p1Choices').show();
    $('#messageHeader').text('Nice choice player 2!');
    $('#messageText').text(data.winner + " is the winner!");
  });

  $('body').on('click', '.choice', function (e){
    e.preventDefault();
    let p1Choice = $(this).text(),
        p2Choice = $(this).text();
    if(thisUser.username===player1){
      if (p1Choice !== '' && $(this).parent().attr('id') === 'p1Choices'){
        socket.emit('p1Choice', {player1, p1Choice});
      }
    }

    
    if (thisUser.username===player2){
      if (p2Choice !== '' && $(this).parent().attr('id') === 'p2Choices'){
        socket.emit('p2Choice', {player2, p2Choice});
      }
    }
  });
}

