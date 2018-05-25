const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const index = require('./routes/index');
const users = require('./routes/users');
app.use('/', index);
app.use('/users', users);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});