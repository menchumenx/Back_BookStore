
const app = require('./app');
require('./dataBase'); // importación de la conexion a la BBDD

app.listen( app.get('port'), () => { console.log(`Server listen on PORT: ${app.get('port')}`) });