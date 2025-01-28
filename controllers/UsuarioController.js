import {check, validationResult}from 'express-validator'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'
import { generarId,generarJWT } from '../helpers/tokens.js'
import { emailRegistro, emailOlvidePassword} from '../helpers/email.js'




//-----------------------------------------------------FORM  Login--------------------------------------
const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesion',
        csrfToken: req.csrfToken()
    })
}
const autenticar = async(req,res) =>{
    //Validacion
    await check('email').isEmail().withMessage('Escribe un email valido').run(req) 
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)
    let resultado = validationResult(req)

    //verificar que el resultado de la comprobacion esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            errores: resultado.array(),
            csrfToken: req.csrfToken()
        })
    }
    const {email, password} = req.body
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({where:{email}})
    if(!usuario){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            errores: [{msg : 'El usuario no se ha registrado previamente'}],
            csrfToken: req.csrfToken()
        })
    }
    //Comprobar si el usuario está confirmado
    if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            errores: [{msg : 'Tu cuenta no está confirmada'}],
            csrfToken: req.csrfToken()
        })
    }
    //Comprobar si la contraseña es correcta
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina: 'Iniciar Sesion',
            errores: [{msg : 'El password es incorrecto'}],
            csrfToken: req.csrfToken()
        })
    }
    //autenticar el usuario    
   const token = generarJWT({id: usuario.id, nombre: usuario.nombre})
    //almacenar en un cookie
    return res.cookie('_token', token,{
        httpOnly: true,
        //secure:true
    }).redirect('/mis-propiedades')
}

//cerrar sesion 
const cerrarSesion = (req,res) => {
    res.clearCookie('_token').redirect('/auth/login')
}

//--------------------------------------------FORM  Formulario de Registro------------------------------
const formularioRegistro = (req,res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
    })
}
//Recibe POST del formulario
const registrar = async(req,res) => {  
//validacion
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Escribe un email valido').run(req) 
    await check('password').isLength({min:6}).withMessage('La contraseña debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false;
        }
            return true; // Validación exitosa
        }
    ).withMessage('Las contraseñas no son iguales').run(req);

    let resultado = validationResult(req)

//verificar que el resultado de la comprobacion esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/registro',{
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            csrfToken: req.csrfToken(),
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email               
            }
        })
    }
//Extraer los datos
    const {nombre, email, password} = req.body
//verificar duplicacion de usuarios
    const existeUsuario = await Usuario.findOne({where: {email : email}})
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina: 'Crear cuenta',
            errores: [{msg : 'El email ya está registrado'}],
            csrfToken: req.csrfToken(),
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
//creacion de usuario y generacion de token
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

//Envia email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

//Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos Enviado un Email de confirmación, presiona en el enlace'
    })


}
//Recibe GET del Enlace de confirmación de cuenta 
const confirmar = async(req,res) =>{
    
    const {token} = req.params;

    console.log(token)

    //Verificar si el token es valido
    const usuario = await Usuario.findOne({where:{token}})
    if(!usuario){
        res.render('auth/confirmarCuenta', {
            pagina: 'Error al confirmar la cuenta',
            mensaje: 'hubo un error al confirmar tu cuenta, intentalo de nuevo',
            error: true
        })
    }

    //Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();
    res.render('auth/confirmarCuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta ha sido confirmada'
    })

}


//-------------------------------------------FORM Recuperación de contraseña----------------------------
const formularioRecuperarContrasena = (req,res) => {
    res.render('auth/recuperarContrasena', {
        pagina: 'Recupera tu Contraseña',
        csrfToken: req.csrfToken()
    })
}
// Recibe POST del Formulario
const ResetPassword = async(req,res) =>{
//validacion
    await check('email').isEmail().withMessage('Escribe un email valido').run(req) 

    let resultado = validationResult(req)

//verificar que el resultado de la comprobacion esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/recuperarContrasena',{
            pagina: 'Recupera tu Contraseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }
//Buscar al usuario por si no existe
    const {email} = req.body
    const usuario = await Usuario.findOne({where: {email}})
    if(usuario === null){
        return res.render('auth/recuperarContrasena',{
            pagina: 'Recupera tu Contraseña',
            errores: [{msg : 'El email no está registrado'}],
            csrfToken: req.csrfToken()
        })
    }
//Generar un token y enviar email
    usuario.token = generarId()
    await usuario.save()

    //enviar email 
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })
    //Renderizar el mensaje
    res.render('templates/mensaje', {
        pagina: 'Restablece tu contraseña',
        mensaje: 'Hemos enviado un email con las instrucciones'
    })
}
// Recibe GET del enlace del Email 
const comprobarToken = async(req,res) =>{
    const {token} = req.params;

    //Verificar si el token es valido
    const usuario = await Usuario.findOne({where:{token}})
    if(!usuario){
        res.render('auth/confirmarCuenta', {
            pagina: 'restablece tu contraseña',
            mensaje: 'Hubo un error al reestablecer tu contraseña, intentelo de nuevo',
            error: true
        })
    }

    res.render('auth/resetContrasena', {
        pagina: 'Reestablecer tu contraseña',
        csrfToken: req.csrfToken()
    })
}
//Recibe POST del Formulario recuperar contraseña   
const nuevoPassword = async(req,res) =>{

    await check('password').isLength({min:6}).withMessage('La contraseña debe ser de al menos 6 caracteres').run(req)
    let resultado = validationResult(req)

//verificar que el resultado de la comprobacion esté vacio
    if(!resultado.isEmpty()){
        return res.render('auth/resetContrasena',{
            pagina: 'Reestablecer tu contraseña',
            errores: resultado.array(),
            csrfToken: req.csrfToken()
        })
    }

    const {token} = req.params
    const {password} = req.body
//identificar quien hace el cambio
    const usuario = await Usuario.findOne({where: {token}})
//hash de contraseña
    const salt = await bcrypt.genSalt(10)
    usuario.password =  await bcrypt.hash( password, salt)
    usuario.token = null

    await usuario.save()
    res.render('auth/confirmarCuenta', {
        pagina: 'Contraseña Reestablecido',
        mensaje: 'Se modificó la contraseña correctamente'
    })
}   


export {
    formularioLogin,
    autenticar,
    cerrarSesion,
    formularioRegistro,
    registrar,
    confirmar,
    formularioRecuperarContrasena,
    ResetPassword,
    comprobarToken,
    nuevoPassword
    
}