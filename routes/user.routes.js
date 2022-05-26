const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
} = require('../controllers/user.controllers');
const { validarRol, validarExistEmail, validarExistId } = require('../helpers/db-validators');




const router = Router();

router.get('/',
    usuariosGet)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validarExistId),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('role').custom(validarRol),
    validarCampos
], usuariosPut)

router.post('/create', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('role').custom(validarRol),
    // check('role','No es un rol válido').isIn(['ADMIN', 'USER']),
    check('correo').custom(validarExistEmail),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validarExistId),
    validarCampos
], usuariosDelete)


module.exports = router