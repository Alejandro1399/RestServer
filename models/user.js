const { Schema, model } = require('mongoose')

const userSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },

    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },

    img: {
        type: String,
    },

    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER']
    },

    state: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject()
    return usuario
}

module.exports = model('User', userSchema);