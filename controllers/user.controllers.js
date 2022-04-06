const { response,request } = require('express')

const usuariosGet = (req = request,   res = response) => {

    const {q, nombre} = req.query

    res.json({
        msg: 'get api bien',
        q
    })
}
const usuariosPost = (req, res) => {

    const body = req.body

    res.json({
        msg: 'post api bien',
        body
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete api bien'
    })
}
const usuariosPut = (req, res) => {

    const id = req.params.id
    res.json({
        msg: 'put api bien'
    })
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut

}