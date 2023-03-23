

const {Book} = require('../models/bookClass');
const {User} = require('../models/userClass')
const connection = require('../dataBase'); // importación de la BBDD 


// REGSITRO DE USUARIOS
function postRegister(request, response){

    let answer;

    const params = [request.body.name, 
                    request.body.last_name,
                    request.body.email,
                    request.body.photo, 
                    request.body.password];

    const sql = `INSERT INTO user (name, last_name, email, photo, password)
    VALUES (?,?,?,?,?)`

    connection.query(sql, params, (err, result)=>{
        if(err){
            console.log(err);
        } else {
            console.log(result);
            answer = {error: false, code:200, message: 'usuario registrado', data: null, result:result}
        }

        response.send(answer);
    })
}


// LOGIN USUARIO
function postLogin(request, response){
    let answer;
    const params = [request.body.email, request.body.password];
    const sql = `SELECT * FROM user WHERE email = ? AND password = ? `;

    connection.query(sql, params, (err, result)=> {
        if(err){
            console.log(err);
            answer = {error: true, code:200, message: 'error en login', data: null, result:err}

        } else {

            if(result.length > 0){
                console.log(result);
                answer = {error: false, code:200, message: 'usuario Logeado', data: null, result:result}

            }else {
                answer = {error: false, code:200, message: 'sin coincidencia', data: null, result:result}
            }
        }

        response.send(answer);
    })
}




module.exports = { postRegister, postLogin}