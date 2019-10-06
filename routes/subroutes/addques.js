const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuidv4').default;

module.exports = function(req, res) {

    let db = new sqlite3.Database('./db/authentic.db');
    const question = req.params.ques;
    const tags = req.body.tags;

    db.get("SELECT COUNT(*) FROM threads", (err, countjson) =>  {
        for(let key in countjson) {
            if(countjson.hasOwnProperty(key)) {
                count = countjson[key];
                aPromise(count).then(res.redirect(`/question/${question}`))
                break;
            }
        }

        
    })
    const aPromise  = function(count)   {
        return new Promise(function(resolve, reject)    {
            db.get(`SELECT userid FROM users WHERE username = "${req.session.username}"`, (err, username) => {
                let threadid = uuid();
                db.run(`INSERT INTO userthread (userid, threadid) VALUES ("${username.userid}", "${threadid}")`);
                db.run(`INSERT INTO threads (threadid, question, tags, upvotes, downvotes) 
                        VALUES ( "${threadid}", "${question}" ,"${tags}", "0" , "0")`);
        
            });
            db.get("SELECT COUNT(*) FROM threads", (err, new_countjson) =>  {
                for(let key in new_countjson) {
                    if(new_countjson.hasOwnProperty(key)) {
                        new_count = new_countjson[key];
                        if(new_count - 1 == count)  {
                            resolve("redirecting")
                        }
                        else    {
                            reject("itsbroke")
                        }
                        break;
                    }
                }
                
            })
        })
    }
    db.run('CREATE TABLE IF NOT EXISTS threads(threadid, question, tags, upvotes, downvotes)');
    db.run('CREATE TABLE IF NOT EXISTS userthread(userid, threadid)') 
}