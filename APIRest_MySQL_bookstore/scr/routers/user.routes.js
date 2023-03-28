

const {Router} = require('express');
const router = Router();

const bookCtrl = require('../controller/book.conrtoller');
const userCtrl = require('../controller/user.controller');
const { User } = require('../models/userClass');


router.get('/', bookCtrl.getStart);

router.post('/register', userCtrl.postRegister);
router.post('/login', userCtrl.postLogin);
router.put('/user', userCtrl.updateUser)



module.exports = router