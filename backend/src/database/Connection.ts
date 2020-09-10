//Variables de entorno
require('dotenv').config();

//Dependencias
import { createConnection, ConnectionOptions, Connection } from "typeorm";

/**
 * Crea la connexión con la base de datos
 * @param option optiones de conexión
 */
const newConnection = async (option?: ConnectionOptions): Promise<void> => {
    //Variables local
    let connection: Connection;
    
    try {

        //Se valida si exiten opciones del usuario o se ocuparan por las variables de entorno
        if (option)
            connection = await createConnection(option);
        else
            connection = await createConnection({
                type: "mysql",
                url: process.env.DB_URL,
                entities: ["./dist/models/**/*.js"],
                synchronize: true
            });

        //Se valida si exixte una conexión a la base de datos
        if (connection) 
            console.log(">>>BD is connected!");

    } catch (error) {
        console.log(error);
    }
};

//Export the connection
export default newConnection;