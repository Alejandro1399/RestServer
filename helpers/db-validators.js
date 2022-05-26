
const Role = require('../models/roles')
const Usuario = require('../models/user')

const validarRol = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol : ${role}  no existe en la base de datos`)
    }
}

const validarExistEmail = async (correo) => {

    // Verificar si el correo existe 
    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo : ${correo} ya esta registrado`)
        //  return res.status(400).json({
        //      msg: 'El correo ya esta registrado'
        //  });
    }
}
const validarExistId = async (id) => {

    // Verificar si el id existe 
    const existId = await Usuario.findById(id );
    if (!existId) {
        throw new Error(`El id : ${id} no existe`)

    }
}
module.exports = { validarRol, validarExistEmail,validarExistId }