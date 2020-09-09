//Environment variables
require('dotenv').config();

//Dependeses
import { createConnection, ConnectionOptions, Connection } from "typeorm";

/**
 * Create a new connection with a database
 * @param option: option connection
 */
const newConnection = async (option?: ConnectionOptions): Promise<void> => {
    //Local Variables
    let connection: Connection;
    
    try {
        if (option)
            connection = await createConnection(option);
        else
            connection = await createConnection({
                type: "mysql",
                url: process.env.DB_URL,
                entities: ["./dist/models/**/*.js"],
                synchronize: true
            });

        //I validaed the connection
        if (connection) 
            console.log(">>>BD is connected!");
    } catch (error) {
        console.log(error);
    }
};

//Export the connection
export default newConnection;