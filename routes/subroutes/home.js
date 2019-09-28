const sqlite3 = require('sqlite3').verbose();

module.exports = async function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');
    db.all('SELECT * FROM threads ORDER BY upvotes DESC LIMIT 10', (err, questions) => {
        if(questions)   {
            res.render('home', {questions: questions})
        }
    })
}

