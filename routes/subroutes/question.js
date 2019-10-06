const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/authentic.db');

module.exports = async function(req, res) {

    const question1 = req.params.ques;
    const posts = [];


    db.get(`SELECT threads.tags,
                threads.threadid,
                threads.upvotes,
                threads.downvotes,
                users.username
            FROM threads
            NATURAL JOIN userthread
            NATURAL JOIN users
            WHERE threads.question = "${question1}";`, (err, row) => {
                console.log(row);
                db.all(`SELECT posts.* 
                        FROM posts
                        NATURAL JOIN threadpost
                        WHERE threadpost.threadid = "${row.threadid}"`, (err, rows) =>   {
                            console.log(rows)
                            if(rows.length != 0)    {
                                rows.forEach((row)  => {
                                    posts.push({"answer":row.answer,
                                                "upvotes":row.pupvotes,
                                                "downvotes":row.pdownvotes})
                                })

                            }
                            
                            if(posts.length == rows.length || posts.lenght === 0) {
                                res.render('question', {"question": question1,
                                                        "username": row.username,
                                                        "upvotes":row.upvotes,
                                                        "downvotes":row.downvotes,
                                                        "posts": posts}
                                )
                            }
                        })

    })
    
}