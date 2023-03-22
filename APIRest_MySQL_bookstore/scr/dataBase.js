
const mysql = require('mysql2');

const connection = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'Menchu89', // modificar por la mia
        database: 'bookstore' // modificar por la mia

    }
)

connection.connect((err) => {
    if(err){
        console.log(err);
    } else { console.log(err);}
})

module.exports = connection