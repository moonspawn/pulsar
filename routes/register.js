const sqlite3 = require('sqlite3').verbose();

module.exports = function(req, res) {
    let db = new sqlite3.Database('./db/authentic.db');
    db.run('CREATE TABLE IF NOT EXISTS users (userid, username, password, email, name_first, name_last, contact)')
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const contact = req.body.contact
    const email = req.body.email

    db.get('SELECT userid FROM users ORDER BY userid DESC LIMIT 1', (err, id) =>  {
        if(id)  {
            userid = parseInt(id.userid)+1
        }
        else {
            userid = 1
        }
        
        db.run(`INSERT INTO users (userid, username, password, email, name_first, name_last, contact) VALUES ( "${userid}", "${username}", "${password}" , "${email}" , "${firstname}" , "${lastname}" , "${contact}" )`)
    })

    res.render('login')
}