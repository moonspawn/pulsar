const sqlite3 = require('sqlite3').verbose();

module.exports = function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');

    let threadid, tags, upvotes, downvotes;
    
    const question = req.params.ques

    db.get(`SELECT * FROM threads WHERE question = "${question}"` , (err, row) => {
        console.log(row)
        threadid = row.threadid;
        tags = row.tags;
        upvotes = row.upvotes;
        downvotes = row.downvotes;
        console.log(upvotes)
        db.close()
    })


    
    res.render('thread',{id: threadid,
                        question: question,
                        username: req.session.username,
                        tags: tags,
                        upvotes: upvotes,
                        downvotes: downvotes});
}