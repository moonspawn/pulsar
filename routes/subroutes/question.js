const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/authentic.db');

module.exports = async function(req, res) {

    const question = req.params.ques;

    
    await db.get(`SELECT * FROM threads WHERE question = "${question}"`, (err, row) => {
        db.get(`SELECT userid FROM userthread WHERE threadid = "${row.threadid}"`,(err, userid) => {
            db.get(`SELECT username FROM users WHERE userid = "${userid.userid}"`, (err, username) =>    {
                assign(row, username.username)
            })
        })
    })
    
    function assign(row, username)   {
        jason = {"question": question,
                "username": username,
                "tags": row.tags,
                "upvotes": row.upvotes,
                "downvotes": row.downvotes}
        res.render('thread', jason);
    }   
}