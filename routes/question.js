const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/authentic.db');

module.exports = async function(req, res) {

    const question = req.params.ques;

    sql = `SELECT * FROM threads WHERE question = "${question}"`
    await db.get(sql, (err, row) => {
        assign(row)
    })

    function assign(row)   {
        jason = {"question": question,
                "username": req.session.username,
                "tags": row.tags,
                "upvotes": row.upvotes,
                "downvotes": row.downvotes}
        res.render('thread', jason);
    }   
}