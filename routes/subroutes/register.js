const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuidv4').default;

module.exports = function(req, res) {
    let db = new sqlite3.Database('./db/authentic.db');
    db.run('CREATE TABLE IF NOT EXISTS users (userid, username, password, email, name_first, name_last, contact)')
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const contact = req.body.contact
    const email = req.body.email
    const userid = uuid()

    db.run(`INSERT INTO users (userid, username, password, email, name_first, name_last, contact) VALUES ( "${userid}", "${username}", "${password}" , "${email}" , "${firstname}" , "${lastname}" , "${contact}" )`)
    res.render('login')
}