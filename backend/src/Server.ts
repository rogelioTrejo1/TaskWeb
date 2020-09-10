//Variables de Entorno
require('dotenv').config();

//Dependencias
import express, { Application, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";

//Rutas
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
     * Retorna la aplicacion del servidor
     */
    public get App(): Application {
        return this.app;
    }

    /**
     * Establece todas las configuraciones del servidor
     * @param {number} port puerto del servidor en el que que trabaje
     */
    private settings(port?: number): void {
        this.app.set('port', port || process.env.PORT || 3500);
    }

    /**
     * Establece todos los middlewares que se ocuparan el el servidor
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));

        /**
         * Si el entorno es igual a "develoment", se usara la liberia de morgan para
         * revisar todas las peticiones del cliente, de lo contrario no sera nesesario su uso.
         */
        if (process.env.NODE_ENV === 'develoment')
            this.app.use(morgan('dev'));
    }

    /**
     * Establese las rutas del servidor
     */
    private routes(): void {
        this.app.use(routes);
        this.app.use('/api', apiRoutes);
    }

    /**
     * Arranca el server el el puerto establecido
     */
    public startServer(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`)
        });
    }
    
}

//Exportación del modulo
export default Server;