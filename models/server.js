const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        this.usuariosPath = '/api/users'
        // Middlewares
        this.middlewares()
        // routes 
        this.routes()
    }

    middlewares() {
        // cors 
        this.app.use(cors())

        // Parseo Json del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user.routes'))
    }
    listen() {


        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto : ${this.port}`)
        })
    }

}


module.exports = Server;