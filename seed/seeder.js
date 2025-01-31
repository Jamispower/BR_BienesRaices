import {exit} from 'node:process'
import categorias from './categorias.js'
import precios from './precios.js'
import usuarios from './usuarios.js'
import db from '../config/db.js'
import {Categoria, Precio, Usuario} from '../models/index.js'

const importarDatos = async () => {
    try{
        //autenticar
        await db.authenticate()

        //Generar columnas
        await db.sync()

        //Insertar los datos   
        
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])
        console.log('Datos importados Correctamentes')
        exit()
        

    }catch(error){
        console.log(error)
        exit(1)
    }
}

const EliminarDatos = async () =>{
    try{
        /*  await Promise.all([
            Categoria.destroy({where: {}, truncate: true}),
            Precio.destroy({where: {}, truncate: true}),
            Usuario.destroy({where: {}, truncate: true})
        ])  */
        await db.sync({ force: true })

        console.log('Datos eliminados Correctamentes')
        exit()
    }catch(error){
        console.log(error)
        exit(1)
    }
}

if(process.argv[2]=== "-i"){
    importarDatos();
}
if(process.argv[2]=== "-e"){
    EliminarDatos();
}