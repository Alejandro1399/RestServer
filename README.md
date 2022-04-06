# Sección 8: REST Server - Configuraciones iniciales

## Express basado en clases

Comunmente un servido Express se ve asi en el archivo app.js 

```jsx
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto : ${port}`)
})
```

Lo pasamos a una clase  

```jsx
const express = require('express')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        // Middlewares
        this.middlewares()
        // routes 
        this.routes()
    }

    middlewares() {
        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get api bien'
            })
        })
        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'put api bien'
            })
        })
        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'post api bien'
            })
        })
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete api bien'
            })
        })

    }
    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto : ${this.port}`)
        })
    }

}

module.exports = Server;
```

[http-response-codes.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e304c87-4b6b-4405-ad21-8c239d89edce/http-response-codes.pdf)