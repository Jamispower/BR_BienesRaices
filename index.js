//const express = require('express') //CommonJS
import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoute from './routes/usuarioRoute.js'
import propiedadesRoute from './routes/propiedadesRoutes.js'
import appRoute from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'

import db from './config/db.js'
import { canTreatArrayAsAnd } from 'sequelize/lib/utils'

//Crear la app o servidor
const app = express()

//habilitar lectura de datos de formularios (solo textos)
app.use( express.urlencoded({extended:true}))

//habilitar cookie en la web
app.use(cookieParser())

//Habilitar CSURF
app.use(csrf({cookie:true}))

//COnexion a bbdd
try{
    await db.authenticate()
    db.sync()
    console.log('Conexión correcta a la base de datos')
}catch(error){
    console.log(error)
}

//Habilitar pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta pública
app.use(express.static('public'))

//Routing
app.use('/', appRoute)
app.use('/api', apiRoutes)
app.use('/auth', usuarioRoute)
app.use('/', propiedadesRoute)


//Definir puerto y arrancar el proyecto
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`El servidor esta funcionando enn el puerto  ${port}`)
})

