const express = require('express');
var path = require('path');

const port = 3000;
const app = express();

app.use(express.static('js'));
app.use(express.static('css'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/pokedex.html'));
});
app.listen(port);