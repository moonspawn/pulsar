const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuidv4').default;

module.exports = function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');
    const question = req.params.ques
    const tags = req.body.tags
    
    db.run('CREATE TABLE IF NOT EXISTS threads(threadid, question, tags, upvotes, downvotes)')
    db.run('CREATE TABLE IF NOT EXISTS userthread(userid, threadid)')
        
    db.get('SELECT threadid FROM threads ORDER BY threadid DESC LIMIT 1', (err, id) =>  {
        let threadid = uuid();
        db.get(`SELECT userid FROM users WHERE username = "${req.session.username}"`, (err, username) => {
            db.run(`INSERT INTO userthread (userid, threadid) VALUES ("${username.userid}", "${threadid}")`);
            db.run(`INSERT INTO threads (threadid, question, tags, upvotes, downvotes) VALUES ( "${threadid}", "${question}" ,"${tags}", "0" , "0")`);
            res.redirect(`/question/${question}`);
        })
    })
    /*

    if(req.body.upvotes)  {
        console.log(req.body.upvotes)
    }

    if(req.body.downvotes)  {
        console.log(req.body.downvotes)
    }
    */
}