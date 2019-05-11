const express = require('express');
const app = express();

const sql = require('./utilities/mysql');

const fruitsRoute = require('./routers/fruits');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/fruits', fruitsRoute);
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    sql.query("Select * from fruits", (err, data) => {
        if(err){
            console.log(err);
            res.send("Error");
        }
        else{
            console.log(data);
            res.send("Success");
        }
    })
});

app.listen(3030);