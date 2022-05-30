const { response, request } = require('express')
const jwt = require("jsonwebtoken")
const Usuario = require('../models/user')

const isAdminRole = async (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        });
    }
    const { role } = req.user;

    if (role !== 'ADMIN') {
        return res.status(401).json({
            msg: "El usuario no tiene permiso para realizar esta acción"
        });
    }


    next()

}


const haveRole = (...roles) => {


    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            });
        }
        const { role } = req.user;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `Para realizar esta funcion se requiere que sea uno de estos role ${roles}`
            });
        }

        next()
    }
}


module.exports = {
    isAdminRole,
    haveRole
}