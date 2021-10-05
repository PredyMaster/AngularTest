'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true}).then(() => {

    //Crear Server
    app.listen(port, () =>{
        console.log("Servidor creado correctamente");
    });
});