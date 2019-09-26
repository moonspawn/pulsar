const express = require('express')
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const login = require('./subroutes/login');
const register = require('./subroutes/register');
const home = require('./subroutes/home');
const addques = require('./subroutes/addques');
const ques = require('./subroutes/question');
const post = require('./subroutes/answer')

router.use(express.static('../public'));

router.get('/', login);


router.get('/signup', function(req, res) {
    res.render('signup');
})

router.post('/register', register);

router.post('/home', home);


router.get('/askquestion', function(req, res) {
    res.render('addQues');
})


router.post('/question/:ques', addques);

router.get('/question/:ques', ques);

router.get('/question/:ques/post', (req,res) => {
    res.render('answer')
});

router.post('/question/:ques/post', post);


module.exports = router
