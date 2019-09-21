const sqlite3 = require('sqlite3').verbose();

module.exports = function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');
    var threadid = null
    const question = req.params.ques
    const tags = req.body.tags
    
    db.run('CREATE TABLE IF NOT EXISTS threads(threadid, question, tags, upvotes, downvotes)')
    db.run('CREATE TABLE IF NOT EXISTS userthread(userid, threadid)')
        
    db.get('SELECT threadid FROM threads ORDER BY threadid DESC LIMIT 1', (err, id) =>  {
        if(id)  {
            threadid = parseInt(id.threadid)+1
            console.log(id)
        }
        else {
            threadid = 1
        }
        db.get(`SELECT userid FROM users WHERE username = "${req.session.username}"`, (err, username) => {
            db.run(`INSERT INTO userthread (userid, threadid) VALUES ("${username.userid}", "${threadid}")`)
            db.run(`INSERT INTO threads (threadid, question, tags, upvotes, downvotes) VALUES ( "${threadid}", "${question}" ,"${tags}", "0" , "0")`)
        })
    })

    if(req.body.upvotes)  {
        console.log(req.body.upvotes)
    }

    if(req.body.downvotes)  {
        console.log(req.body.downvotes)
    }

    res.render('confirm')
    
}