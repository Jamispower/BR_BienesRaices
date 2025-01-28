import bcrypt from 'bcrypt'
const usuarios = [
    {
        nombre: 'Jaime',
        email: 'jmg1095@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('123123', 10)
    }
]

export default usuarios;
