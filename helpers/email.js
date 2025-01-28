import nodemailer from 'nodemailer'

const emailRegistro = async(datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    const {email, nombre, token} = datos
    //enviar mail
    await transport.sendMail({
        from: 'Bienes Raices.com',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices',
        text: 'Confirma tu cuenta en Bienes Raices',
        html:`
            <p> Hola ${nombre}, comprueba tu cuenta en bienesRaices.com</p>

            <p> Tu cuenta ya está lista solo debes pinchar en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}"> CONFIRMAR CUENTA</a> </p>
            
            <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
        `
    })
}

const emailOlvidePassword = async(datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    const {email, nombre, token} = datos
    //enviar mail
    await transport.sendMail({
        from: 'Bienes Raices.com',
        to: email,
        subject: 'Resetea tu contraseña en BienesRaices.com',
        text: 'Resetea tu contraseña en BienesRaices.com',
        html:`
            <p> Hola ${nombre}, ha solicitado restablecer tu contraseña en bienesRaices.com</p>

            <p> sigue el siguiente enlace para generar una contraseña nueva:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/recuperarContrasena/${token}"> CAMBIAR CONTRASEÑA</a> </p>
            
            <p>Si tu no solicitaste el cambio,puedes ignorar el mensaje</p>
        `
    })
}


export{
    emailRegistro,
    emailOlvidePassword
}