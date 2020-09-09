//Environment variables
require('dotenv').config();

//Dependenses
import express, { Application, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import routes from "./routes/routes";
import apiRoutes from "./routes/api.routes";

class Server {
    private app: Application;

    constructor(port?: number) {
        this.app = express();
        this.settings(port);
        this.middlewares();
        this.routes();
    }

    /**
     * Return the application of the server
     */
    public get App(): Application {
        return this.app;
    }

    /**
     * Set all the settings of the server
     * @param {number} port port of the server on which you will be working
     */
    private settings(port?: number): void {
        this.app.set('port', port || process.env.PORT || 3500);
    }

    /**
     * Set all middelwares that use on the server
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));

        /**
         * If the eviroment is same to "Develoment", we use a lib "Morgar" to check the requests of
         * the client, else we do not use "Morgan"
         */
        if (process.env.NODE_ENV === 'develoment')
            this.app.use(morgan('dev'));
    }

    private routes(): void {
        this.app.use(routes);
        this.app.use('/api', apiRoutes);
    }

    /**
     * Start the server
     */
    public startServer(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`)
        });
    }
    
}

//Export the module
export default Server;