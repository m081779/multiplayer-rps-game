const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const config = require('./config/database');

//express-handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

//serving up static files
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = Promise;
mongoose
  .connect(config.database)
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
  })
  .catch(err => console.log('There was an error with your connection:', err));


const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: config.database,
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
const index = require('./routes/index');
const users = require('./routes/users')(passport);
app.use('/', index);
app.use('/users', users);


//starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});