'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

//const article = require('../models/article');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master',
            year: 2021,
            autor: 'yeah',
            hola
        });

    },

    test: (req, res) => {
        res.status(200).send({
            message: "Soy la accion test de mi controlador de articulos"
        });
    },

    save: (req,res) => {

        //Recoger parametros por post
        var params = req.body;
        console.log(params);

        //Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
          
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });
        }

        if(validate_title && validate_content){
           
            //Crear el objeto a guardar
            var article = new Article();

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el articulo
            article.save((err, articleStored) => {

                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se a guardado'
                    });
                }

                //Devolver respuestas            
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });

            });

            

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

    },

    getArticles: (req, res) => {

        var query = Article.find({});
        var last = req.params.last;


        if(last == "true"){            
            query.limit(3);
        }

        if(last == "8"){
            query.sort('_id').limit(parseInt(last));            
        }
        

        query.sort('-_id').exec((err, articles)=>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })        
    },

    getArticle: (req, res) => {

        //Recoger id
        var articleId = req.params.id;

        //Comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            });
        }

        //Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }

            return res.status(200).send({
                status: 'success',
                article
            });

        });
    },

    update: (req, res) => {

        //Recoger el id del articulo por la url
        var articleId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        //validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            if(err){
                return res.status(404).send({
                    status: 'error',
                    message: 'Faltan datos por enviar'
                });
            }
        }
        if( validate_title && validate_content){
            //find and update
            Article.findOneAndUpdate({_id:articleId}, params, {new:true}, (err, articleUpdated)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    articleUpdated
                });

            });
        }else{
            if(err){
                return res.status(404).send({
                    status: 'error',
                    message: 'Faltan datos por enviar'
                });
            }
        }

        //Devoler respuesta
        return res.status(200).send({
            status: 'success',
            message: 'JODEEELLL',
            params
        });

    },

    delete: (req,res) =>{
        //Recoger el id de la url
        var articlesId = req.params.id;

        //Hacer un find and delete
        Article.findOneAndDelete({_id:articlesId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo (NO BORRADO)'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Articulo borrado correctamente',
                articleRemoved
            });
        });

    },

    upload: (req, res) =>{
        //Configurar el modulo del connect Multiparty router/article.js

        //Recoger el fichero de la peticion
        var file_name = "imagen no subida...";

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        //Conseguir nombre y extension del archivo
        var files_path = req.files.file0.path;
        var file_split = files_path.split('/')

        //Nombre del archivo
        var file_name = file_split[2];

        //Extension archivo
        var file_ext = file_name.split('.')[1]

        //COmprobar la extension, solo imagenes o si no borrar fichero
        if(file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'png'){
            
            //Si todo es valido
            var articleId = req.params.id;

            //Buscar el nombre del articulo, asignarle el nombre y actualizarlo

            Article.findOneAndUpdate({_id:articleId}, {image: file_name}, {new:true}, (err, articleUpdated)=>{
                if(err || !articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error al guardar la imagen de articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });

            });

            return res.status(200).send({
                fichero: req.files,
                file_split,
                file_ext
            });
        }else{

            console.log("cagada master");

            fs.unlink(files_path, (err)=>{
                return res.status(404).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                });
            });

        }
        
    },

    getImage: (req,res) => {

        var file = req.params.image;
        var path_file = "./upload/articles/" + file;

        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'error',
                mesagge: 'ninguna image con este nombre'
            });
        }

        return res.status(200).send({
            status: 'success',
            path_file
        });
    },

    search: (req, res) =>{

        //Sacar el string a buscar
        var searchString = req.params.search;

        //Find or 
        Article.find({'$or':[
            { "title" : {"$regex" : searchString, "$options": "i"}},
            { "content" : {"$regex" : searchString, "$options": "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) =>{

            if(err || articles.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    mesagge: 'No se ha encontrado el articulo'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })

    }

};

module.exports = controller;