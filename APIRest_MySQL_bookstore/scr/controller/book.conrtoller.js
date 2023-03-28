

const {Book} = require('../models/bookClass');
const connection = require('../dataBase'); // importación de la BBDD 

let mybooks = [
    new Book('Mi vecino Totoro','Manga','Miyazaki',7,'https://m.media-amazon.com/images/I/81UbyXk3DAL._SL1500_.jpg',1,1),
    new Book('El castillo Ambulante', 'Manga', 'Miyazaki', 15, 'https://img2.rtve.es/imagenes/portada-castillo-ambulante-corazon-pesada-carga/1593422086154.jpg',2),
    new Book('El viaje de Chihiro', 'Manga', 'Miyazaki', 13, 'https://es.web.img2.acsta.net/pictures/21/05/11/13/47/5979708.jpg',3),
    new Book('Kiki aprendiz de bruja', 'Manga', 'Miyazaki', 6, 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/02/nicky-aprendiz-bruja-portada-1858271.jpg?itok=mBit3DEX',4),

    new Book('El recuerdo de Marnie','Manga','Miyazaki',15,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR0wlO4XpGlSKl2HxgQcLc_QEtxOLOk0i5JSlNp2a243T21Qrpc2LvpUjbLuxPooOF6mQ&usqp=CAU',5),
    new Book('La Colina de las Amapolas', 'Manga', 'Miyazaki', 12, 'https://www.ecartelera.com/carteles/6300/6307/003_p.jpg',6),
    new Book('El viento se levanta', 'Manga', 'Miyazaki', 10, 'https://www.tierraadentro.cultura.gob.mx/wp-content/uploads/2014/09/thewindrises.jpg',7),
    new Book('El cuento de la princesa Kaguya', 'Manga', 'Miyazaki', 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFzgfTa5xbkTXqDo5xvgUllxVigYtBJ2o68xCTXHqTBDyCxaVNk6Unh6NvGAOyQ2t8vWo&usqp=CAU',8),
  ]


// ********* FUNCIONES ******************

function getStart(req, res){
    let answer = {error: true, code: 200, message: 'Punto de inicio'};
    res.send(answer);
}



// obtine los datos del libro pasados por ID y si no devuleve todos los libros de la libreria
function getBook(request, response){

  let answer;

  let idBook = request.query.id_book;
  let idUser = request.query.id_user;

  let sql;
  let params = [idUser, idBook]

  if(idBook != null && idBook !=null){
    sql = `SELECT * FROM book
           WHERE id_user = ? AND id_book = ?`;

  } else {
    sql = `SELECT * FROM book
          WHERE id_user = ?`;
  }

  connection.query(sql, params, (err, result)=> {
    if(err){
      console.log(err);

    } else {
      console.log(result);
      answer = {error:false, code: 200, message:'mostrando libros', data: result, result:null}
    }
    response.send(answer)
  })

};


// Añade un libro a la lista de libros de un usuario
function postBook(request, response){
  let answer;
  let params = [request.body.title, 
                request.body.type,
                request.body.author,
                request.body.price,
                request.body.photo,
                request.body.id_user]

  let sql = `INSERT INTO book (title, type, author, price, photo, id_user)
             VALUES (?,?,?,?,?,?)`
  
 connection.query(sql, params, (err, result)=>{

  if(err){
    console.log(err);
  } else {
    answer = {error: false, code: 200, message:`libro ${request.body.title} añadido al user ${request.body.id_user}`, data:null, result:result}

    console.log(result);
  }

  response.send(answer);
})
};



// Modifica los datos del ibro pasado por ID
function editBook(request, response){

  let answer;
  let params = [request.body.title,
                request.body.type, 
                request.body.author,
                request.body.price,
                request.body.photo, 
                request.body.id_book];

  let sql = `UPDATE book SET 
              title = COALESCE (?,title),
              type = COALESCE (?,type), 
              author = COALESCE (?, author), 
              price = COALESCE (?,price), 
              photo = COALESCE (?,photo) 
              WHERE id_book=?`

  if(params != null){

    connection.query(sql, params, (err, result)=>{

      if(err){
        console.log(err);

      } else {
        console.log(result);
        answer = {error: false, code: 200, message:`libro ${request.body.id_book} modificado`, data:null, result:result}

      }
      response.send(answer);
    })
  } else {
    console.log('no se han introducido datos');
  }
};



// Elimina de la lista el libro pasado por ID
function deleteBook(request, response){

  let answer;
  let params = [request.body.id_book];
  console.log(params);
  let sql = `DELETE FROM book WHERE id_book = ?` 

  if(request.body.id_book != null){

    connection.query(sql, params, (err, result)=> {
      if(err){
        console.log(err);

      } else {
        console.log(result);
        answer = {error: false, code: 200, message:`libro con ID ${request.body.id_book} eliminado`, data:null, result:result}
      }
      response.send(answer);
    })
  };
};



module.exports = {getStart, getBook, postBook, editBook, deleteBook};