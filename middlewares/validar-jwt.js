
const { response, request } = require('express')
const jwt = require("jsonwebtoken")
const Usuario = require('../models/user')

const validarJwt = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            msg: "El token no existe"
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.uid = uid

        const user = await Usuario.findById(uid);



        if (!user) {
            return res.status(401).json({
                msg: "El token no es valido"
            });
        }


        if (!user.state) {
            return res.status(401).json({
                msg: "El token no es valido"
            });
        }

        req.user = user;

        next()
    } catch (error) {
        res.status(401).json({
            msg: "El token no es valido"
        })
    }


}


module.exports = { validarJwt }