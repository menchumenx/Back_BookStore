
const {Book} = require('../models/bookClass')

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

  let id = request.query.idBook;
  let res;

  if(id != null){

    let findBook = mybooks.filter(book => book.id_books == id);
    res = findBook.length == 0 ?  {error: true, code:200, message: `No se ha encontrado ningun Libro con ID: ${id}`} : {error: false, codigo:200, data: findBook};

  } else {
    res = mybooks ? {error: false, code:200, data: mybooks} : {error: true, code:200, message: `No se han encontrado libros en la biblioteca`}
  }

  response.send(res)
};



// Añade un libro a la lusta de libros
function postBook(request, response){

  let newBook = new Book (request.body.title, 
                          request.body.type,
                          request.body.author,
                          request.body.price,
                          request.body.photo,
                          request.body.id_books);

  mybooks.push(newBook);

  let res = {error: false, code:200, message:` el libro ${newBook.title} con ID: ${newBook.id_books} ha sido añadido a la lista de libros`}

  response.send(res)
};




// Modifica los datos del ibro pasado por ID
function editBook(request, response){

  let res;
  let id = request.body.id_books;
  console.log(id);

  if(id != null){

  let index = mybooks.findIndex(book => book.id_books == id)

      if (index != -1){

        mybooks[index] = request.body;
        res = {error:false, code:200, message: `El libro con ID: ${id} ha sido modificado`, data: mybooks[index]};

      } else {
        res = {error:false, code:200, message: `No se ha encontrado un libro con ID: ${id}`};
      }
      
  } else { res = {error: true, code:200, message: `No se ha introducido un ID `} };

  response.send(res);

};



// Elimina de la lista el libro pasado por ID
function deleteBook(request, response){

  let res;
  let id = request.body.id_books;

  if(id != null){

    let index = mybooks.findIndex( book => book.id_books == id);

    if(index != -1){
  
      mybooks.splice(index, 1);
      res = {error:false, code:200, message: `El libro con ID: ${id} ha sido eliminado`, data: mybooks[index]};
  
    } else {
      res = {error:false, code:200, message: `No se ha encontrado un libro con ID: ${id}`};
    }
  
  } else {  res = {error: true, code:200, message: `No se ha introducido un ID `}; }

response.send(res)
  
};



module.exports = {getStart, getBook, postBook, editBook, deleteBook};