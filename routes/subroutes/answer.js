const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuidv4').default;

module.exports = (req, res) =>  {
    let db = new sqlite3.Database('./db/authentic.db');
    const question = req.params.ques;
    const answer = req.body.answer;
    const username = req.session.username;
    const postid = uuid()
    console.log(question, answer, username);

    db.run("CREATE TABLE IF NOT EXISTS posts(postid, answer, pupvotes, pdownvotes)")
    db.run("CREATE TABLE IF NOT EXISTS userpost(userid, postid)")
    db.run("CREATE TABLE IF NOT EXISTS threadpost(threadid, postid)")

    db.run(`INSERT INTO posts(postid, answer, pupvotes, pdownvotes) VALUES ("${postid}", "${answer}", "0", "0")`)

    db.get(`SELECT threadid FROM threads WHERE question = "${question}"`, (err, threadid) => {
        console.log(err)
        db.run(`INSERT INTO threadpost(threadid, postid) VALUES ("${threadid.threadid}", "${postid}")`)
    })
    db.get(`SELECT userid FROM users WHERE username = "${username}"`, (err, userid) => {
        console.log(err)
        db.run(`INSERT INTO userpost(userid, postid) VALUES ("${userid.userid}", "${postid}")`)
    })

    res.redirect(`/question/${question}`);
}