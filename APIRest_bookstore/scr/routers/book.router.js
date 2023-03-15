

const {Router} = require('express');
const router = Router();

const bookCtrl = require('../controller/book.conrtoller');


// ***************** ENDPOINTS *********************
router.get('/', bookCtrl.getStart);

router.get('/books', bookCtrl.getBook);
router.post('/books', bookCtrl.postBook);
router.put('/books', bookCtrl.editBook);
router.delete('/books', bookCtrl.deleteBook);



module.exports = router;
