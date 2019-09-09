const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// verifing proper database connection // 
let db = new sqlite3.Database('./db/authentic.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('TEST : DATABASE CONNECTION ESTABLISH SUCCESSFUL');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('TEST : DATABASE CONNECTION TERMINATE SUCCESSFUL');
});
// database connection verification ends //

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user/home', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // INSERT INTO user (username, password, email, name_first, name_last, contact) VALUES ( "shubham" , "qazwsxedcrfvt" , "shubhampednekar1999@gmail.com" , "shubham" , "pednekar" , 9920991399 );
    let db = new sqlite3.Database('./db/authentic.db');
    let sql = `SELECT username usrnm, password pswd FROM user WHERE username  = ?`;
    db.get(sql, [username], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        verify(row, password);

    });

    function verify(row, password) {
        let verified = row ? ((row.pswd == password) ? true : false) : false;
        if (verified) {
            console.log(username, ":", password, ": VERIFIED");
        }
        else {
            console.log(verified)
        }
    }
    db.close()

    res.end();
})

app.get('/', function(req, res) {
    res.render('login')
})

app.get('/signup', function(req, res) {
    res.render('signup')
})

app.post('/register', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // INSERT INTO user (username, password, email, name_first, name_last, contact) VALUES ( "shubham" , "qazwsxedcrfvt" , "shubhampednekar1999@gmail.com" , "shubham" , "pednekar" , 9920991399 );
    let db = new sqlite3.Database('./db/authentic.db');
})


const PORT = process.env.port || 8080;

app.listen(PORT, console.log("Server Started"))
