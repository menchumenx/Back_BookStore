
class Book {

    constructor(title,type, author, price, photo, id_books = 0, id_user=0){
   
        this.title = title,
        this.type = type
        this.author = author;
        this.price = price;
        this.photo = photo;
        this.id_books = id_books;
        this.id_user = id_user;
    }
}

module.exports = {Book};