const express = require('express')
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const login = require('./login');
const register = require('./register');
const home = require('./home');
const ques = require('./addques')


router.use(express.static('../public'));

router.get('/', login);


router.get('/signup', function(req, res) {
    res.render('signup')
})

router.post('/register', register)

router.post('/home', home)

router.get('/askquestion', function(req, res) { 
    res.render('createThread')
})

router.post('/:ques', ques)

module.exports = router
