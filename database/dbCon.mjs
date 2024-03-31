/* import pg from 'pg'

export const pool = new pg.Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/postgres',
});

pool.connect((err)=>{
   if (err) {
      console.log('connection db error', err.stack);
   }else{
      console.log(' dbconnected');
   }
}) */

import mysql from "mysql2";

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'parketplace'
}).promise()

pool.getConnection(function(err, connection) {
   if (err) throw err; // not connected!
 
   // Use the connection
   connection.query('SELECT id FROM users', function (error, results, fields) {
     // When done with the connection, release it.
     connection.release();
     console.log('db connected');
 
     // Handle error after the release.
     if (error) console.log('db error', error);
 
     // Don't use the connection here, it has been returned to the pool.
   });
 });

