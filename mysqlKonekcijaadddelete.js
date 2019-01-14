
// konekcija na bazu
var mysql = require('mysql');


/*var connection = mysql.createConnection({
    host: 'sqldemo.softmetrixgroup.com',
    port: '3306',
    user: 'root',
    password: 'smx1111',
    database: 'mydb'
   
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // kod za iscitavanje iz baze/radi

    //connection.query("SELECT * FROM mydb.kategorije", function (err, result, fields) {

    

       //  Kod za add dugme /radi

       //var sql = "INSERT INTO mydb.kategorije (kat_tip) VALUES ('novo')";
    //connection.query(sql, function (err, result) {
       // if (err) throw err;
       // console.log(result);


  */
        
       // Kod za delete / radi ali ima gresku sitnu 

       var connection = mysql.createConnection({
        host: 'sqldemo.softmetrixgroup.com',
        port: '3306',
        user: 'root',
        password: 'smx1111',
        database: 'mydb'
       
    
    });
       var sql = "DELETE FROM mydb.kategorije WHERE kat_tip ='DOBITAN TIKET'";
        
       // delete a row with id 1
       connection.query(sql, function (error, results)  {
         if (error)
           return console.error(error.message);
        
         console.log('Deleted Row(s):', results.affectedRows);
       });
        
       connection.end();
     // });
 
  
  
 
    // app.listen('3306');