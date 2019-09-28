const sqlite3 = require('sqlite3').verbose();

module.exports = (req, res) => {
    const filter = req.body.s;
    let db = new sqlite3.Database('./db/authentic.db');

    db.all(`SELECT * FROM threads WHERE tags = "${filter}"`, (err, searchresults) =>    {
        if(searchresults)   {
            console.log("searchresults", searchresults)
            res.send(searchresults)
        }
    });
}