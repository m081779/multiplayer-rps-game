const localDB = 'mongodb://localhost:27017/rps-game';//change 'test' to desired name for DB

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || localDB
}
