const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/authentic.db');

module.exports = async function(req, res) {

    const question = req.params.ques;
    const posts = []
    


    await db.get(`SELECT * FROM threads WHERE question = "${question}"`, (err, row) => {
        db.get(`SELECT userid FROM userthread WHERE threadid = "${row.threadid}"`,(err, userid) => {
            db.get(`SELECT username FROM users WHERE userid = "${userid.userid}"`, (err, username) =>    {
                untry(row, username, (row, username, posts) => {
                    console.log(posts)
                    jason = {"question": question,
                    "username": username,
                    "tags": row.tags,
                    "upvotes": row.upvotes,
                    "downvotes": row.downvotes,
                    "posts":posts}
                    console.log(jason)
                    res.render("question", jason)
                })
            })
        })
    })

    
    function untry(row, username, callback)  {
        db.all(`SELECT postid FROM threadpost WHERE threadid="${row.threadid}"`, (err, postids) =>   {
            if(postids.length > 0) {
                console.log(postids)
                postids.forEach((postid) =>   {
                    db.get(`SELECT * FROM posts WHERE postid = "${postid.postid}"`, (err, post) =>  {
                        posts.push({"post": post})
                        console.log("suck")
                        if(postids.length === posts.length)    {
                            callback(row, username.username, posts)
                        }
                    })
                })
            }
            else    {
                console.log("khsbhj")
                callback(row, username.username)
            }
        })
    }
    
}