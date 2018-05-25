const express = require('express');

const router = express.Router();


router.get('/', function (req,res) {
  res.render('index');
});

router.get('/signup', function ( req, res ) {
  res.render('signup');
});

router.get('/login', function ( req, res ) {
  res.render('login');
});

router.get('/main', function (req,res){
  res.send('main');
})


module.exports = router;