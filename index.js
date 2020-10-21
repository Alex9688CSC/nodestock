const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path= require('path');
const PORT= process.env.PORT || 5120;

//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff= "hello there, this is other stuff"
//set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

//set static folder
app.use(express.static(path.join(__dirname, 'Public')));
app.listen(PORT, ()=> console.log('Server Listing on port'+ PORT));

