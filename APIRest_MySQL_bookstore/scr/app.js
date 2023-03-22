
// importacion de módulos
const express = require('express');
const cors = require('cors');
const bookRouter = require('./routers/book.router');
const userRouter = require('./routers/user.routes');
const errorHandling = require('./error/errorHandling');

const app = express();

// definición de puerto
app.set('port', process.env.PORT || 3000);

// llamadas a tros módulos y midlewares
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(bookRouter);
app.use(userRouter);
app.use((req, res, next)=>{ res.status(404).json( {error:true, code: 404, message: 'Endpoint doesnt found'} ) });
app.use(errorHandling);

module.exports = app;