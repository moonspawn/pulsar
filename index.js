const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const routes = require('./routes/routes');


// verifying proper database connection //
let db = new sqlite3.Database('./db/authentic.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('TEST : DATABASE CONNECTION ESTABLISH SUCCESSFUL');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('TEST : DATABASE CONNECTION TERMINATE SUCCESSFUL');
});
// database connection verification ends //

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));


app.use('/', routes);

const PORT = process.env.port || 8080;

app.listen(PORT, console.log("Server Started"));
