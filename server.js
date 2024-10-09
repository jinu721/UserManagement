// require mdoules
const express = require('express');
const path = require('path');
const app = express();
const users = require('./config/mongo');
const session = require('express-session');

// view engine setup
app.set('view engine','ejs')
app.set('views', [
    path.join(__dirname, 'views', 'user'),
    path.join(__dirname, 'views', 'admin')
]);
  

// static file middleware
app.use(express.static(path.join(__dirname,'public')))

// parse body and json
app.use(express.json())
app.use(express.urlencoded({extended:true}));


// session and cookie handle

app.use(session({
    secret:'key273636keySectret',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24*30}
}))

app.use(async (req,res,next)=>{
    if(req.session.loggedIn===true){
        if(req.path==='/'||req.path==='/login'||req.path==='/register'){
            return res.redirect('/home');
        }else if(req.path==='/admin'||req.path==='/dashboard'){
                const currentUser = req.session.currentUser;
                if(!currentUser) return res.redirect('/home');
                try{
                    const userData = await users.findOne({username:currentUser,role:'admin'})
                    if(!userData){
                        return res.redirect('/home')
                    }
                    return next()
                }catch(err){
                    return res.status(500).send('Server Error');
                }
        }
    }else{
        if(req.path==='/home'||req.path==='/admin'||req.path==='/dashboard'){
            return res.redirect('/login');
        }
    }
    next();
})

app.use(async(req,res,next)=>{
    const currentUser = req.session.adminLoggedIn;
    if(req.path==='/dashboard'){
        if(!currentUser){
            return res.redirect('/');
        }
    }else if(req.path==='/admin'){
        if(currentUser){
            return res.redirect('/dashboard');
        }
    }
    next();
})


// app.use('/search',(req,res,next)=>{
//     console.log(req.body)
// })



const userRoutes = require('./routes/userRoutes');
app.use('/',userRoutes);
const adminRoutes = require('./routes/adminRoutes')
app.use('/',adminRoutes);



app.listen(3000,()=>{
    console.log('Server started : http://localhost:3000/ ')
})