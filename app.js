const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const path = require('path'); // Trabalhar diretorios
const Post = require('./Models/Post');
const formulario = require('./Models/Post');

// Configuração do HandLeBars
    // informa ao express a utilização do template handlebars como um egine 
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    // Habilitar dados para renderizar o each
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"assets")));

// Formulario
app.get("/cadastro",function(req,res) {
    res.render('formulario');
})

app.get("/", function(req,res) {
    Post.findAll().then((posts) => {
        res.render('home', {posts: posts});
    })
})

// CREATE
app.post('/add',function(req,res){
    formulario.create({
        nome: req.body.nome,
        conteudo: req.body.conteudo
    }).then(function(){
        res.send("Post criado com sucesso")
    }).catch(function(erro){
        res.send("Houve um erro " + erro)
    })
})

// DELETE
app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id': req.params.id}}).then(() => {
        const msg = "Postagem deletada com sucesso."
        res.render('delete', {msg: msg})
    })
    .catch(() => {
        const msg = ("Esta postagem não foi deletada" + erro)
        res.render('delete', {msg: msg})
    })
}) 

// EDIT
app.get("/edit/:id", (req, res) => {
    Post.findOne({where: {id: req.params.id}})
    .then((post) => {
        res.render('editposts', {post:post})
    }).catch(() => {
        res.redirect("/");
    })
})

// UPDATE
app.post("/edit", (req, res) => {
    Post.findOne({where: {id: req.body.id}})
    .then((post) => {
        post.nome = req.body.nome
        post.conteudo = req.body.conteudo

        post.save().then(() => {
            res.redirect("/")
        }).catch(() => {
            res.redirect("/")
        })
    })
})

app.listen(8080,function(){console.log("Concectado")});

