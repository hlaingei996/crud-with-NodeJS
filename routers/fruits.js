const express = require('express');

const route = express.Router();

const sql = require('../utilities/mysql');

route.get('/', (req, res) => {
    sql.query("Select * from fruits", (err, data) => {
        if(err){
            console.log(err);
            res.send("Error");
        }
        else{
            //console.log(data);
            //res.send("Success");
            res.render('fruits', {data, data});
        }
    })
})

route.post('/', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const stock = req.body.stock;

    sql.query(
        "insert into fruits(name,stock) values (?,?)",
        [name, stock],
        (err, data) => {
            if(err) {
                console.log(err);
                res.send("Error");
            }
            else{
                res.redirect('/fruits');
            }
            
        }
    )
})

route.get('/:id', (req, res) => {
    const fruit_id = req.params.id;
    sql.query("Select * from fruits where id=?", fruit_id, (err, data) => {
        if(err){
            res.send("Error");
        }
        else{
            const string=JSON.stringify(data);
            const json =  JSON.parse(string);
            const id = json[0].id;
            const name = json[0].name;
            const stock = json[0].stock;

            res.render('fruit-detail', {data : {
                id: id,
                name: name,
                stock: stock
            }});
        }
    })
})

route.get('/edit/:id', (req,res) => {
    const fruit_id = req.params.id;
    sql.query("Select * from fruits where id=?", fruit_id, (err, data) => {
        if(err){
            res.send("Error");
        }
        else{
            //console.log(data);
            const string=JSON.stringify(data);
            const json =  JSON.parse(string);
            const id = json[0].id;
            const name = json[0].name;
            const stock = json[0].stock;

            res.render('fruit-edit', {data : {
                id: id,
                name: name,
                stock: stock
            }});
        }
    })
})

route.post('/edit/:id', (req, res) => {
    const fruit_id = req.params.id;
    const new_name = req.body.name;
    const new_stock = req.body.stock;
    console.log(new_name);
    console.log(new_stock);

    
    sql.query(
        "update fruits set name = ? , stock=? where id=?",[new_name, new_stock, fruit_id],
        (err, data) => {
            if(err) {
                console.log(err);
                res.send("Error");
            }
            else{
                console.log(data);
                res.redirect('/fruits');
            }
            
        }
    )
})

route.get('/delete/:id', (req, res) => {
    const fruit_id = req.params.id;
    sql.query("delete from fruits where id=?", fruit_id, (err, data) => {
        if(err){
            res.send("Error");
        }
        else{
            res.redirect('/fruits');
        }
    })
})

module.exports = route;