const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/register',(req,res)=>{
    res.set('Cache-Control', 'no-store');
    res.render('register');
});

router.get(/^\/?(login(\.html)?)?$/,(req,res)=>{
    res.set('Cache-Control', 'no-store');
    res.render('login');
});

router.get('/home',userController.whenHomeGet);

router.post('/register',userController.whenRegister);
router.post('/login',userController.whenLogin);
router.post('/logout',userController.whenLogout);


module.exports = router;