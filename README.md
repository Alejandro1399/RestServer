## Express basado en clases

Comúnmente un servido Express se ve así en el archivo app.js 

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

Asi nos quedaría el app.js 

```jsx
require('dotenv').config()
const Server = require('./models/Server')

const server = new Server();
server.listen()
```

[http-response-codes.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e304c87-4b6b-4405-ad21-8c239d89edce/http-response-codes.pdf)

## Cors

[cors](https://www.npmjs.com/package/cors)

Nos permite proteger nuestro servidor 

## Routes

Se crea la carpeta routes para definir las rutas para cada parte y asi tener un mejor orden ejemplo rutas de usuarios tanto crear, eliminar, modificar

```jsx
const { Router } = require('express');

const router = Router();
router.get('/api', (req, res) => {
    res.json({
        msg: 'get api bien'
    })
})
router.put('/api', (req, res) => {
    res.json({
        msg: 'put api bien'
    })
})
router.post('/api', (req, res) => {
    res.json({
        msg: 'post api bien'
    })
})
router.delete('/api', (req, res) => {
    res.json({
        msg: 'delete api bien'
    })
})

module.exports = router;
```

## Configuración del post

para recibir un post se configura los midlewares con la siguiente linea de codigo en servicios 

```dart
// Lectura y parseo del body 
        this.app.use(express.json())
```

en controladores se usa el req.body para recibir los datos 

## params

los parametros es lo que va en el url en routes se lo configura como :id  y en controladores se usa como req.params del cual se hace una destructuración

## query

esto es como los params pero son opcionales en controladores se usa como req.query