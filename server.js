/**
 * Dependencias
 */
const express = require('express');  
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const connStr = "Server=ASSERTH-401\\SQLEXPRESS;Database=BASE_TESTE;User Id=sa;Password=123456;";
const sql = require("mssql");
// const connStr = "Server=DESKTOP-L73PS25;Database=MeuBanco;User Id=sa;Password=123456;";

// Configurando o Servidor
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});

/**
 * configura nossa aplicação (app) Express para usar o body parser 
 * que carregamos da biblioteca body-parser, permitindo que recebamos 
 * mais tarde POSTs nos formatos URLEncoded e JSON
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + "/public"));



//app.use(express.errorHandler());

//cria conexão com o banco
sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => {
        console.log(err);
    });


//Rotas
app.get('/', function(req, res){  
    res.render('index', {
        title: 'Inicio',        
    });  
});

// tela de novo cadastro
app.get('/item', function(req, res){  
    res.render('novo', {
        title: 'Inserir Item',        
    });  
});

// tela de novo cadastro
app.get('/lista/:id?', function(req, res){        
    var id = req.params.id;
    console.log(id);
    var filter = "";
    if(id) filter =  `where nome like '%${id}%'`
    var sqlQry = `select * from itens ${filter}`    
    global.conn.request()
        .query(sqlQry)
        .then(result => {
            res.render('lista', {
                title: 'Lista de Itens',        
                lista: result.recordset                
            });            
        })
        .catch(err => {
            res.render('erro', {
                title: 'erro',        
                erro: err
            });
        });    
});

// cadastra novo item
app.post('/item/novo', function(req, res){
    var body = req.body
    sqlQry = `insert into itens values ('${body.nome}','${body.descricao}', ${body.quantidade})`
    global.conn.request()
        .query(sqlQry)
        .then(result => {
            res.redirect('/lista' + string);            
        })
        .catch(err => {
            res.render('erro', {
                title: 'erro',        
                erro: err
            });
        });      
});

//start server 
console.log("server running at localhost:8080");
app.listen(process.env.PORT || 8080);