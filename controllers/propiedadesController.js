import {unlink} from 'node:fs/promises'
import {validationResult}from 'express-validator'
import {Precio, Categoria, Propiedad, Mensaje, Usuario} from '../models/index.js'
import { where } from 'sequelize'
import {esVendedor, formatearFecha} from '../helpers/index.js'

//GET a mis-propiedades
const admin = async(req, res) => {

    //Leer query string

    const {pagina: paginaActual} = req.query
    const expresion  = /^[1-9]$/ //expresion regular
    if(!expresion.test(paginaActual)){
        return res.redirect('/mis-propiedades?pagina=1')
    }
    try {
        const { id } = req.usuario
        const limite = 5
        const offset = ((paginaActual * limite) - limite)


        

        const [propiedades, total] = await Promise.all([
            await Propiedad.findAll({ 
                limit: limite,
                offset,
                where: {
                    usuarioId: id
                },
                include:[
                    {model: Categoria, as: 'categoria'},
                    {model: Precio, as: 'precio'},
                    {model: Mensaje, as: 'mensajes'}, 

                ]
            }),
            Propiedad.count({
                where: {
                    usuarioId: id
                }
            })
        ])  
        const npag = Math.ceil(total / limite)  

        res.render('propiedades/admin',{
            pagina:'Mis propiedades',
            csrfToken: req.csrfToken(),
            propiedades,
            paginas: npag,
            paginaActual: parseInt(paginaActual),
            offset,
            limite,
            total
        })
    } catch (error) {
        console.log(error)
    }


   
}
//GET a crear propiedad
const crear = async(req, res) => {
    //importar modelos precio y categoria
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    //renderizar vista
    res.render('propiedades/crear',{
        pagina:'Crear Propiedad',
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos:{}
    })

}
//POST del formulario de crear propiedad
const guardar = async(req, res)=>{
    
    //Validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        //traer precios y categorias por si la validacion falla cargar de nuevo el formulario
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/crear',{
            pagina: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body
            
        })
    }

    //Crear un registro
    const {titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId} = req.body
    
    const{id: usuarioId} = req.usuario

    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId,
            usuarioId,
            img: ''
        })

        const { id } = propiedadGuardada

        res.redirect(`/propiedades/agregar-imagen/${id}`)
    
    } catch (error) {
        console.log(error)
    }
    
}
//GET a formulario de añadir imagen para un ID especifico de propiedad
const agregarImagen = async(req, res)=>{
    const {id} = req.params
    //validar que exista la propiedad
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect(`/mis-propiedades`)
    }
//validar que no esté publicada

    if(propiedad.publicado){
        return res.redirect(`/mis-propiedades`)
    }

//validar que la propieda es de quien visita esta pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect(`/mis-propiedades`)
    }



    res.render('propiedades/agregar-imagen', {
        pagina:`Agregar Imagen: ${propiedad.titulo}`,
        propiedad,
        csrfToken: req.csrfToken()
    })
}
//POST de agregar imagen
const almacenarImagen = async (req,res, next) => {
    const {id} = req.params
    console.log(req)
    //validar que exista la propiedad
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect(`/mis-propiedades`)
    }
    //validar que no esté publicada

    if(propiedad.publicado){
        return res.redirect(`/mis-propiedades`)
    }

    //validar que la propieda es de quien visita esta pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect(`/mis-propiedades`)
    }

    try {
        console.log(req.file)

        //almacenar imagen y public propiedad
        propiedad.img = req.file.filename
        propiedad.publicado = 1

        await propiedad.save()

        next()

    } catch (error) {
        console.log(error)

    }

}
const editar = async (req,res) =>{

    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id)

    if(!propiedad){
        return res.redirect(`/mis-propiedades`)
    }

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect(`/mis-propiedades`)
    }
    //importar modelos precio y categoria
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    //renderizar vista
    console.log(propiedad)
    res.render('propiedades/editar',{
        pagina:`Editar Propiedad: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos: propiedad
    })
}
const guardarCambios = async (req, res) => {
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id)
    //Verificar validacion
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){

        //traer precios y categorias por si la validacion falla cargar de nuevo el formulario
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/editar',{
            pagina: `Editar Propiedad: ${propiedad.titulo}`,
            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body
            
        })
    }

    

    if(!propiedad){
        return res.redirect(`/mis-propiedades`)
    }

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect(`/mis-propiedades`)
    }

    try {
        const {titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId} = req.body

        propiedad.set({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })
        await propiedad.save()

        res.redirect(`/mis-propiedades`)

    } catch (error) {
        console.log(error)
    }

}
const eliminar = async (req, res) => {
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect(`/mis-propiedades`)
    }

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect(`/mis-propiedades`)
    }
    //Eliminar la imagen asociada
    await unlink(`public/uploads/${propiedad.img}`)
    console.log('se elimino la imagen')
    //Eliminar propiedad
    await propiedad.destroy()
    res.redirect(`/mis-propiedades`)

}
//modifica el estado de la propiedad
const cambiarEstado = async (req, res) => {
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect(`/mis-propiedades`)
    }

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect(`/mis-propiedades`)
    }
    //Actualizar el estado
    propiedad.publicado = !propiedad.publicado

    await propiedad.save()

    res.json({resultado: true})


    console.log(propiedad)
}


const mostrarPropiedad = async (req, res) => {
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id , {
        include:[
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    })
    
    if(!propiedad || !propiedad.publicado){
        return res.redirect(`/404`)
    }
    
    res.render('propiedades/mostrar',{
        pagina: propiedad.titulo,
        propiedad,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId)
    })
}
const enviarMensaje = async (req, res) => {
    const {id} = req.params

    const propiedad = await Propiedad.findByPk(id , {
        include:[
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    })
    
    if(!propiedad){
        return res.redirect(`/404`) //Si no está la propiedad redirigir a 404
    }
    //Renderizar los errores
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        return res.render('propiedades/mostrar',{
            pagina: propiedad.titulo,
            propiedad,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
            errores: resultado.array(),
        })
        
    }
    //Almaceno el mensaje
    await Mensaje.create({
        mensaje: req.body.mensaje,
        usuarioId: req.usuario.id,
        propiedadId: propiedad.id
    })


    res.redirect(`/`)
}

const verMensajes = async (req, res) => {
    //Buscar la propiedad con los mensajes y el usuario del mensaje
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id,{
                include:[
                    {model: Mensaje, 
                        as: 'mensajes',
                        include: [
                            {model: Usuario.scope('eliminarPassword'), as: 'usuario'}
                        ]
                    } 
                ]
    })
     
    if(!propiedad){
        return res.redirect(`/mis-propiedades`) //Si no está la propiedad redirigir a mis propiedades
    }

    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){ //Si no es el dueño de la propiedad redirigir a mis propiedades
        return res.redirect(`/mis-propiedades`)
    }

    res.render('propiedades/mensajes',{
        pagina: `Mensajes de`,
        csrfToken: req.csrfToken(),
        mensajes: propiedad.mensajes,
        formatearFecha
    })
}

export{
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    cambiarEstado,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes

}