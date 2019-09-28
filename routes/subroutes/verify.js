const sqlite3 = require('sqlite3').verbose();

module.exports = async function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');

    const username = req.body.username;
    const password = req.body.password;

    let sql = `SELECT username usrnm, password pswd FROM users WHERE username  = ?`;
    await db.get(sql, [username], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if(verify(row, password))   {
            req.session.username = username
            res.redirect('/home')
        }
        else    {
            res.render('login', {authentication: false})
        }
    });

    function verify(row, password) {
        let verified = row ? ((row.pswd == password) ? true : false) : false;
        if (verified) {
            //adding username to session            
            console.log(username, ":", password, ": VERIFIED");
            return true
        }
        else {  
            console.log(verified)
            return false
        }
    }
}
