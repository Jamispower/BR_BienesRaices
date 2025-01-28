import  Sequelize  from "sequelize";
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USUARIO,process.env.BD_PASS,{
    host: process.env.BD_HOST,
    port:3307,
    dialect:'mysql',
    define: {
        timestamps: true
    },
    pool:{
        max:10,
        min:0,
        acquire: 15000,
        idle:10000
    },
    dialectModule: mysql2,
    operatorAliases: false
});

export default db