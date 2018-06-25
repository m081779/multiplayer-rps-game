module.exports = {
  //object of all rooms
  rooms: {},

  //method that creates a new room and takes and optional callback
  createRoom: function(callback = (function(){})) {
    
    let roomNums = Object.keys(this.rooms),//create array of room numbers
        lastRoom = Number(roomNums[roomNums.length - 1]),//index of last room in object
        newRoom;//variable for returning newly created room
    
    //if no rooms exist one is creates
    if (roomNums.length<1){
      newRoom = '1';
      this.rooms['1'] = {player1: '', player2: ''};
      return newRoom;
    }
    //loop through rooms to check for rooms that have been deleted 
    //from the middle and replaces them
    for (let i = 0; i< roomNums.length; i++){
      
      let key = Number(roomNums[i]);//converts room property into a number for maths
      var createNewRoom = false;//flag for creating a new room if rooms are sequential
      //if true, there's a hole in the sequence so create a room at that index
      if (key !== i+1){
        let newRoom = i+1;
        console.log(key, i+1,'not equal');
        this.rooms[empty] = {player1: '', player2: ''};
        return newRoom;
      }
      //if loop finishes, then all rooms are sequential
      //therefore we need to create a new room at the end
      createNewRoom = true;
    }

    //conditional creates a new room at end of sequence
    if (createNewRoom){
      newRoom = lastRoom +1;
      this.rooms[newRoom.toString()] = {player1: '', player2: ''};
    }
    callback();
    return newRoom;
  },

  //method deletes room using a stringified number, and takes an optional callback
  deleteRoom: function(roomString, callback = function () {}) {
    delete this.rooms[roomString];
    callback();
  },

  //method adds player to first room that needs one
  addPlayer: function (user, callback = function () {}){
    let roomKeys = Object.keys(this.rooms);//creating array of this.rooms properties
    let roomNum;//variable to store room to return later

    //checks if there are no rooms, if true it creates a new room
    if(roomKeys.length < 1){
      roomNum = '1';
      this.rooms[roomNum] = {player1: '', player2: ''};
    }

    //roomKeys must be reset because there may now be a newly created room
    roomKeys = Object.keys(this.rooms);

    //loop through the keys and check if there's a player 1.  If not, add one
    //else, check if there's a player2.  If not, add one
    for (let i = 0; i< roomKeys.length; i++){
      if (!this.rooms[i+1].player1){
        this.rooms[i+1].player1 = user;
        roomNum = i+1;
        return roomNum;
      }
      else if (this.rooms[i+1].player1 && !this.rooms[i+1].player2){

        this.rooms[i+1].player2 = user;
        this.createRoom();
        roomNum = i+1;
        return roomNum;
      }
    }
    callback();
  },

  //method to remove player from room
  deletePlayer: function (user, callback = function (){}){
    let player;
    let roomNum;

    //looks for player in each room. Stores the roomnumber and whether user is p1 or p2
    Object.keys(this.rooms).forEach(item => {
      if (this.rooms[item].player1===user ){
        player = 'player1';
        roomNum = item;
      }
      if (this.rooms[item].player2===user ){
        player = 'player2';
        roomNum = item;
      }
    });
    //sets the correct player in the correct room to an empty string
    this.rooms[roomNum.toString()][player] = '';
    callback();
  }
};