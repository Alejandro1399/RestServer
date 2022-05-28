const bcryptjs = require('bcryptjs')

const { response, request } = require('express')

const Usuario = require('../models/user')

const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre } = req.query
    const { limite = 5, desde = 0 } = req.query

    // const usuarios = await Usuario.find({ state: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments({ state: true })


    // Promise. all ejecuta ambas promesas de manera simultanea es muy util para trabajar con hilos 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ state: true }),
        Usuario.find({ state: true })
            .skip(Number(desde))
            .limit(Number(limite))

    ])


    res.json({
        total, usuarios
    })
}
const createUser = async (req = request, res = response) => {

    const { nombre, correo, password, role } = req.body
    const user = Usuario({ nombre, correo, password, role });




    // Encriptar la contraseña 

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    // 

    await user.save();


    res.json({
        msg: 'post api bien',
        user
    })
}
const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params
    // * Borrar un usuario por id definitivamente de la bd no es recomendable
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, { state: false }, { new: true })
    res.json({
        usuario
    })
}
const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params
    const { _id, password, google, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })

    res.json({
        msg: 'put api bien',
        id,
        usuario
    })
}



module.exports = {
    usuariosGet,
    usuariosPost: createUser,
    usuariosDelete,
    usuariosPut

}