const express = require('express');
const mysql = require('mysql');
const app = express();

app.set('view engine','ejs')
app.use(express.static('public'));

const db = mysql.createConnection({
    localhost: 'localhost',
    user: 'root',
    password: '',
    database:'node-me',
})

db.connect(function(err) {
    if (err) {
        throw err;
    } 
      
  //Select only "name" and "address" from "customers":
});

app.get('/',(req,res)=> {
    
    db.query("SELECT id,unit_name,monthly_rent FROM rooms", function (err, result, fields) {
        if (err) {
          throw err;  
        } 
        else {
            console.log(result.length);
        }

       // res.send(result);
        res.render('pages/index', { results:result });
    });
    
})

app.get('/edit/:id', (req, res,next) => {
    const id = req.params.id;
    const sql = 'SELECT id,unit_name,monthly_rent FROM rooms WHERE id = ?';
    db.query(sql,[id],(err,result,fields)=> {
        if (err) throw err;
        console.log(result.length + ' got '+fields);
        
        res.render('pages/edit',{room:fields})
});

})


app.get('/delete/:id', (req, res,next) => {
    const id = req.params.id;
    const sql = 'DELETE FROM rooms WHERE id = ?';
    db.query(sql,[id],(err,result)=> {
        if (err) throw err;
        console.log(result.affectedRows + ' room deleted');
        
        res.redirect('/');
    });
})

app.get('/new',(req,res)=> {
    res.render('pages/new');
})



    app.listen('3000');
