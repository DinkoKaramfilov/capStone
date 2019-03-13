var express = require('express');
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){
 	res.render('index',{ 'status': 'Press Button To change Status of Led !!' });
});

app.post('/led/on', function(req, res){
    gpio.write(6, true, function(err){
        if(err){
            throw err;
        }
        console.log('Written True to pin');
        console.log(path.join(__dirname, 'public'));
        
        return res.render('index', { 'status': 'on' });
    });
});

app.post('/led/off', function(req, res){
    gpio.write(6, false, function(err){
        if(err){
            throw err;
        }
        console.log('Written False to pin');
        console.log(path.join(__dirname, 'public'));
        
        return res.render('index',{ 'status': 'of' });
    });
});

app.listen(50, function(){
    console.log('Simple LED Control Server Started on Port: 3000!');
});
