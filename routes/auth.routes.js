const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controllers');
// const { validarExistEmailAuth, validarStateUserAuth } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    // check('correo').custom(validarExistEmailAuth),
    // check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }), Aqui fernando dice que es mejor no dar pistas de como luce una contraseña
    validarCampos
], login)

router.post('/google',[
    check('id_token','El id token es necesario').not().isEmpty(),
    validarCampos

],googleSignIn)


module.exports = router