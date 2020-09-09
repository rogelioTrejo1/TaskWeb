//Environment variables
require('dotenv').config();

//Dependenses
import "reflect-metadata";
import Server from "./Server";
import connection from "./database/Connection";

/**
 * Main function
 */
async function main(): Promise<void> {
    try {
        const server: Server = new Server();

        //Services
        server.startServer();
        await connection();

    } catch (error) {
        console.error(error);
    }
}

main();