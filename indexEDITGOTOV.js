const express = require('express');
const app = express();
const path = require('path')
const http = require('http');
const mysql = require('mysql');
const port = 3000;
const bodyparser = require('body-parser');

const db = mysql.createConnection({
    host: 'sqldemo.softmetrixgroup.com',
    port: '3306',
    user: 'root',
    password: 'smx1111',
    database: 'moneytracker',
    multipleStatements: true
});



// Body Parser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.use('js', express.static('js'));

app.get('/', function(req, res) {
    db.query('SELECT main_id, main_date, main_cat, main_sum, main_com FROM main', function(err, result) {
        if (err) {
            throw err;
        } else {
            main = result;
            console.log(main);
            res.render('index', main);
        }
    })
})

// app.post('/delete',(req, res)=> {
//     let delete_id = Number(req.body.main_id); 
//     console.log(req.params);
//     con.query('DELETE FROM main where main_id= ?', [delete_id],(err, rows,fields)=> {
//         if (!err) {
//             data = {
//                 deleted: true
//             }
//             res.send('Deleted successfully.');
//         } else {
//           console.log(err);
//             console.log(main);
           
//        }
//    })
// })
app.post('/delete',(req, res) => {
    let delete_id = Number(req.body.main_id); 
    db.query('DELETE FROM main where main_id= ?', [delete_id],(err, rows,fields)=> {
        if (!err) {
            data = {
                deleted: true
            }
            res.send('Deleted successfully.');
        } else {
            console.log(err);
            console.log(main);
       }
   })
})




// app.post('/add',function(req, response) {

//     var form = {
//         main_date: req.body.main_date,
//         main_cat: req.body.main_cat,
//         main_sum: req.body.main_sum,
//         main_com: req.body.main_com
//     }

//     db.query('INSERT INTO main (main_date, main_cat, main_sum, main_com) VALUES ("' + form.main_date + '", "' + form.main_cat + '", ' + form.main_sum + ', "' + form.main_com + '")',  function (err, res) {
//         if (err) {
//             throw err;
//         } else {
//             res.json(req.body);
//         }
//     }) 
// });

//edit
    //let sql  = "UPDATE moneytracker.main  SET main_date = '"+date+"', main_cat = '"+category+"', main_sum = '"+number+"', main_com='"+comment+"' WHERE main_id = '"+id+"' "

app.post('/add',function(req, res) {
    console.log(req)
    let date = req.body.date;
    let category = req.body.category;
    let number = req.body.number;
    let comment = req.body.comment;
    //let id = req.body.id; 
    db.query("INSERT INTO `moneytracker`.`main` (`main_date`, `main_cat`, `main_sum`, `main_com`) VALUES ('"+date+"', '"+category+"', '"+number+"', '"+comment+"');", function(err, result) {

        if (err) {
            throw err;
        } else {
            var data = {};
            res.json(req.body);
      }
    })
})

app.post('/edit',function(req, res) {
    console.log(req)
    let date = req.body.date;
    let category = req.body.category;
    let number = req.body.number;
    let comment = req.body.comment;
    let id = req.body.id; 
    db.query("UPDATE `moneytracker`.`main` SET `main_date`='"+date+"', `main_cat`='"+category+"', `main_sum`='"+number+"', `main_com`='"+comment+"' WHERE `main_id`='"+id+"'", function(err, result) {

        if (err) {
            throw err;
        } else {
            var data = {};
            res.json(req.body);
      }
    })
})

  //save changes

//    app.post('/save1',function(req, response) {
   
//      let date = req.body.date;
//      let category = req.body.category;
//      let number = req.body.number;
//      let comment = req.body.comment;
//      let id = req.body.id; 

//      let sql  = "UPDATE moneytracker.main  SET main_date = '"+date+"', main_cat = '"+category+"', main_sum = '"+number+"', main_com='"+comment+"' WHERE main_id = '"+id+"' "
     
//      con.query(sql, function(err, result) {
//          if (err) {
//            throw err;
//         } else {
//           response.send('200');
//        }
//     }) 
//  })})



 app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});
