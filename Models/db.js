const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql','root','root', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(function(){
        console.log("Conectado")
    }).catch(function(){
        console.log("Não concectado")
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
} 
