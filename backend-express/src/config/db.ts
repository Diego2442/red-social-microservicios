import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize( process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    /* define: {
        timestamps: false
    }, */ //Esto es para deshabilitar el created y updated que se crean automáticamente
    logging: false, //Esto es para que no se muestre todo el código sql en consola
    dialectOptions: {
        //Estamos en localhost, entonces no tenemos certificado ssl
        /* ssl: {
            require: false
        } */

        //Esto se usa cuando postgres esta en local
        ssl: false
    }
})