//dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const favicon = require('serve-favicon');

const config = require('./config/database');

//setup favicon middleware
app.use(favicon(__dirname + '/client/build/favicon.ico'));


// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting up cookie parser middleware
app.use(cookieParser());

// Serve up static assets
app.use(express.static("client/build"));
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = Promise;
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then( result => console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`))
  .catch(err => console.log('There was an error with your connection:', err));


const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: config.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: 'sdf897ghjty78s97d8gd4bgf4d65st4fg453g43r5tgh786g4b65dz1s',
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false,
  store: store
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport); // pass passport for configuration


//routes
const userRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth")(passport);
app.use("/api/users/", userRoutes);
app.use('/api/auth/', authRoutes);


//starting the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});