const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path= require('path');
const request= require('request')
const bodyParser = require('body-parser')
const PORT= process.env.PORT || 5120;


// user body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));

// API Key 
//create call_api function 
function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' +ticker + '/quote?token=pk_c5b127615d0b4eb9925735138dc49fae',{json:true},(err, res, body)=>{
    if(err){return console.log(err);}
    if(res.statusCode===200){
        //console.log(body);
        finishedAPI (body);
    };
});
};


//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff= "hello there, this is other stuff"
//set handlebar index get route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            stock: doneAPI
        });
    });
});

//set handlebar index Post route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
            //posted_stuff= req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI,
            //posted_stuff: posted_stuff
        });
    },req.body.stock_ticker);
});


//create about page route 
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'Public')));
app.listen(PORT, ()=> console.log('Server Listing on port'+ PORT));

