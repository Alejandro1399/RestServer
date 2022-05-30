const bcryptjs = require('bcryptjs')
const { response, request } = require('express')
const { generarJWT } = require('../helpers/generar-jwt')
const Usuario = require('../models/user')


const login = async (req = request, res = response) => {


    try {

        const { correo, password } = req.body
        // verificar que el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: `El correo : ${correo} no esta registrado`
            })

        }

        //validar estado del usuario 
        if (!usuario.state) {
            return res.status(400).json({
                msg: `El correo : ${correo} ha sido eliminado `
            })
        }


        // validar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: `La contraseña es incorrecta`
            })
        }
        // Generar jwt
        const token = await generarJWT(usuario.id)


        res.json({
            msg: "ok",
            usuario,
            token
        })




    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })

    }


}


module.exports = { login }