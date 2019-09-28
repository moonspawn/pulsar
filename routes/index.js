const express = require('express')
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const login = require('./subroutes/login');
const register = require('./subroutes/register');
const verify = require('./subroutes/verify')
const home = require('./subroutes/home');
const addques = require('./subroutes/addques');
const ques = require('./subroutes/question');
const answer = require('./subroutes/answer')
const search = require('./subroutes/search')


router.use(express.static('../public'));

router.get('/', login);

router.post('/', verify)

router.get('/signup', function(req, res) {
    res.render('signup');
})

router.post('/register', register);

router.get('/home', home);

router.post('/search', search)

router.get('/askquestion', function(req, res) {
    res.render('addQues');
})


router.post('/question/:ques', addques);

router.get('/question/:ques', ques);

router.get('/question/:ques/post', (req,res) => {
    res.render('answer')
});

router.post('/question/:ques/post', answer);


module.exports = router
