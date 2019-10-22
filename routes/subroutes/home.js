const sqlite3 = require('sqlite3').verbose();

module.exports = async function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');
    db.all('SELECT * FROM threads LIMIT 10 OFFSET (SELECT COUNT(*) FROM threads)-10;', (err, questions) => {
        if(questions)   {
            questions.reverse()
            res.render('home', {questions: questions})
        }
    })
}

