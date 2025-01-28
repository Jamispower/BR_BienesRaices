import { format } from 'date-fns';
import { toZonedTime, format as formatTz } from 'date-fns-tz';


const esVendedor = (usuarioId, propiedadUsuario) =>{
    return usuarioId === propiedadUsuario
}

const formatearFecha = fecha =>{
    //const newdate = toZonedTime(fecha, 'Europe/Madrid');
    //const fechaformateada = format(newdate, 'dd/MM/yyyy HH:mm',{timeZone: 'Europe/Madrid'}) 
    const nuevaFecha = new Date(fecha).toISOString().slice(0,10)

    const opciones = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const fechaFormateada = new Date(nuevaFecha).toLocaleDateString('es-ES', opciones);
    return fechaFormateada
}

export{
    esVendedor,
    formatearFecha
}
