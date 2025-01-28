import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'    
import Mensaje from './Mensaje.js'

//Precio.hasOne(Propiedad)
//Propiedad.belongsTo(Precio) otra forma de hacer lo mismo que la tabla de arriba
//Categoria.hasOne(Propiedad)
//Usuario.hasMany(Propiedad)

Propiedad.belongsTo(Precio) 
Propiedad.belongsTo(Categoria) 
Propiedad.belongsTo(Usuario)
Propiedad.hasMany(Mensaje, {foreignKey: 'propiedadId'}) 

Mensaje.belongsTo(Usuario, {foreignKey: 'usuarioId'})
Mensaje.belongsTo(Propiedad,{foreignKey: 'propiedadId'})

export{
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje
}