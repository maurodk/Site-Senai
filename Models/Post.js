const db = require('./db')

const formulario = db.sequelize.define('postagens', {
    nome: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    } 
})

// formulario.sync({force: true});

module.exports = formulario;