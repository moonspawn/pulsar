const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user/home', function(req, res) {
    const username = req.body.username
    console.log(username)
    const password = req.body.password
    console.log(password)
    res.end()
})

app.get('/', function(req, res) {
    res.render('login')
})



const PORT = process.env.port || 5000;

app.listen(PORT, console.log("Server Started"))
