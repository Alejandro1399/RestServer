const express = require('express')
var cors = require('cors')
const { dbConnection } = require('../database/config.db')
const path = require("path");

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8081
        this.usuariosPath = '/api/users'

        // Database connection
        this.connectionDb()

        // Middlewares
        this.middlewares()

        // routes 
        this.routes()
    }

    async connectionDb() {
        await dbConnection()

    }

    middlewares() {
        // cors 
        this.app.use(cors())

        // Other app.use middleware
        this.app.use(express.static(path.join(__dirname, "client", "build")));

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