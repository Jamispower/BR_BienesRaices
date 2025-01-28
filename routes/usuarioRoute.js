import express from "express";
import { formularioLogin,autenticar,cerrarSesion, formularioRegistro,registrar, formularioRecuperarContrasena,ResetPassword, confirmar,comprobarToken,nuevoPassword } from "../controllers/UsuarioController.js";

const router = express.Router();

//-------------------------------------------------Routing LOGIN
router.get('/login', formularioLogin)
router.post('/login', autenticar)

//Cerrar sesion

router.post('/cerrar-sesion', cerrarSesion)

//-------------------------------------------------Routing REGISTRO
router.get('/registro', formularioRegistro)
router.post('/registro', registrar)
router.get('/confirmar/:token',confirmar)
    
//------------------------------------------Routing RECUPERACION DE CONTRASEÑA
router.get('/recuperarContrasena', formularioRecuperarContrasena)
router.post('/recuperarContrasena', ResetPassword)
router.get('/recuperarContrasena/:token', comprobarToken) //despues del mail
router.post('/recuperarContrasena/:token', nuevoPassword)



export default router