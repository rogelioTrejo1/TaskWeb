// Dependencias
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import keys from "./keys";

// Modelos
import { Task } from "./models/Task";
import { User } from "./models/User"

const newConnection = async (options?: ConnectionOptions): Promise<void> => {
    // Variables locales
    let connection: Connection;

    try {
        // Se valida si existen option del usuario o se ocupan variables de entorno
        if (options)
            connection = await createConnection(options)
        else
            connection = await createConnection({
                type: "mysql",
                username: keys.database.username,
                password: keys.database.passsword,
                database: keys.database.database,
                url: keys.database.uri,
                entities: [Task, User],
                synchronize: true,
            });

        //Se valida si exixte una conexión a la base de datos
        if (connection)
            console.log(">>>BD is connected!");
    } catch (e) {
        console.error(e);
    }
}

export default newConnection;