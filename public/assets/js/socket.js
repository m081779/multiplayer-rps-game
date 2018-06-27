if (typeof socket !== "undefined"){
  // $.ajax({
  //   url: '/getInfo',
  //   type: 'GET',
  //   success: function (){
      
  //     room = data.roomNumber.toString();
  //     console.log(room, 'room from /getInfo')
  //     console.log(typeof room)
      
  //   },
  //   error: function (err){
  //     console.log('error from /getuser',err)
  //   }
  // })
  socket.on('player1', function(data){
    console.log(data.player2, 'player2');
    console.log(typeof data.player2==='undefined', 'player2 type');
    $('#p1Username').text(data.player1);
    if(typeof data.player2 === 'undefined'){
      $('#p2Username').text('Waiting for player 2');
    }
    console.log(data, 'data from socket player1');
  });
  socket.on('player2', function(data){
    $('#p1Username').text(data.player1);
    $('#p2Username').text(data.player2);
    $('#messageHeader').text('Are you ready to play?');
    setTimeout(function (){
      $('#messageHeader').text('Let\'s begin!');
      $('#messageText').text('Player 1 make your choice...');
      $('#p1Choices').show();
    }, 2000);
    console.log(data, 'data from socket player2');
  });

  $('body').on('click', '.choice', function (){
    let p1Choice = '',
        p2Choice = '';
    p1choice = $(this).text();
    console.log(typeof p1Choice, '$(this).text()');
    if (p1Choice !== ''){
      console.log(p1Choice, p2Choice)
    }
  });
}

