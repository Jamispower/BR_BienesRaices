import express from "express";
import {body}from 'express-validator'
import {admin, crear, guardar,agregarImagen, almacenarImagen,editar,guardarCambios,eliminar,cambiarEstado,mostrarPropiedad, enviarMensaje,verMensajes} from '../controllers/propiedadesController.js'
import protegerRuta from "../middleware/protegerRuta.js";
import upload from "../middleware/subirImagen.js";
import identificarUsuario from "../middleware/identificarUsuario.js";

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin)
router.get('/propiedades/crear',protegerRuta, crear)
router.post('/propiedades/crear', 
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion')
            .notEmpty().withMessage('La descripción no puede ir vacía')
            .isLength({max:500}).withMessage('La descripción es muy larga'),
    body('categoria').isNumeric().withMessage('Debes seleccionar la categoria'),
    body('precio').isNumeric().withMessage('Debes seleccionar el precio'),
    body('habitaciones').isNumeric().withMessage('Debes seleccionar la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Debes seleccionar la cantidad de aparcamientos'),
    body('wc').isNumeric().withMessage('Debes seleccionar la cantidad de baños'),
    body('lat').notEmpty().withMessage('Debes marcar una ubicación en el mapa'),
    
    guardar
)
router.get('/propiedades/agregar-imagen/:id',protegerRuta, agregarImagen)
router.post('/propiedades/agregar-imagen/:id',
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen
)
router.get('/propiedades/editar/:id',
    protegerRuta,
    editar
)
router.post('/propiedades/editar/:id', 
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion')
            .notEmpty().withMessage('La descripción no puede ir vacía')
            .isLength({max:500}).withMessage('La descripción es muy larga'),
    body('categoria').isNumeric().withMessage('Debes seleccionar la categoria'),
    body('precio').isNumeric().withMessage('Debes seleccionar el precio'),
    body('habitaciones').isNumeric().withMessage('Debes seleccionar la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Debes seleccionar la cantidad de aparcamientos'),
    body('wc').isNumeric().withMessage('Debes seleccionar la cantidad de baños'),
    body('lat').notEmpty().withMessage('Debes marcar una ubicación en el mapa'),
    
    guardarCambios
)
router.post('/propiedades/eliminar/:id',
    protegerRuta,
    eliminar
)

router.put('/propiedades/:id',
    protegerRuta,
    cambiarEstado
)

//Area Pública
router.get('/propiedad/:id', 
    identificarUsuario,
    mostrarPropiedad
)

//Almacenar los mensajes
router.post('/propiedad/:id', 
    identificarUsuario,
    body('mensaje')
            .isLength({max:200}).withMessage('El mensaje es muy largo')
            .isLength({min:10}).withMessage('El mensaje es demasiado corto'),
    enviarMensaje
)
router.get('/mensajes/:id',
    protegerRuta,
    verMensajes
)


export default router