const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();


router.use(express.static('../public'));
router.get('/', function (req, res) {
    res.render('login')
});

router.get('/signup', function (req, res) {
    res.render('signup')
});

router.post('/user/register', function (req, res) {
    console.log("hello");
    let db = new sqlite3.Database('./db/authentic.db');
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const contact = req.body.contact;
    const email = req.body.email;
    db.run(`INSERT INTO user (username, password, email, name_first, name_last, contact) VALUES ( "${username}", "${password}" , "${email}" , "${firstname}" , "${lastname}" , "${contact}")`);

    res.render('login')
});

router.post('/user/home', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let db = new sqlite3.Database('./db/authentic.db');
    let sql = `SELECT username usrnm, password pswd FROM user WHERE username  = ?`;
    db.get(sql, [username], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        verify(row, password);

    });

    function verify(row, password) {
        let verified = row ? (row.pswd === password) : false;
        if (verified) {
            console.log(username, ":", password, ": VERIFIED");
        } else {
            console.log(verified)
        }
    }

    db.close();

    res.end();
});

module.exports = router;
