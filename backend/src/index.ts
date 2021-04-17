//Dependencias
import "reflect-metadata";
import Server from "./Server";
import connection from "./database";

/**
 * Función Principal
 */
async function main(): Promise<void> {
    try {
        const server: Server = new Server();

        //Servicios
        server.startServer();
        await connection();

    } catch (error) {
        console.error(error);
    }
}

// Ejecucion de la aplicacion
if (module === require.main)
    main();