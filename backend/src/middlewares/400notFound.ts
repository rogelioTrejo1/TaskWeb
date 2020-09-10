//Dependencias
import { Request, Response } from "express";

/**
 * Manejador de peticiones erroneas (404) del API
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
const notFound404 = (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: "Route of the api not found!!",
        resp: false
    });
};

//Exportacion del modulo
export default notFound404;