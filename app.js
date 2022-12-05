// require modules
const express = require('express');
const morgan = require('morgan')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');


// create app
const app = express();

//config app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');

//Mongo
mongoose.connect(url)
.then(client=>{
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//set up routes

app.get('/', (req, res)=>{
    res.render('pages/index');
})

app.get('/contact', (req, res)=>{
    res.render('pages/contact');
})
app.get('/about', (req, res)=>{
    res.render('pages/about');
})

app.use('/connections', eventRoutes);

app.use((req, res, next) =>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});


