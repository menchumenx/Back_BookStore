
const app = require('./app');

app.listen( app.get('port'), () => { console.log(`Server listen on PORT: ${app.get('port')}`) });