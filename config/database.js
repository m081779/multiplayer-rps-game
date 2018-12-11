const localDB = "mongodb://localhost/test";//change 'test' to desired name for DB

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || localDB
}
