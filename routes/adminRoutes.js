const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/admin',(req,res)=>{
    res.set('Cache-Control','no-store');
    res.render('adminLogin');
});
router.get('/dashboard',adminController.whenDashboardGet);

router.post('/admin',adminController.whenLogin);
router.post('/adminCreate',adminController.whenNewUserCreate);
router.delete('/delete/:id',adminController.whenUserDelete);
router.put('/updateUser/:id',adminController.whenUserUpdate);
router.post('/search',adminController.whenSearch);
router.post('/test',(req,res)=>{
    res.render('test')
});


module.exports = router;
