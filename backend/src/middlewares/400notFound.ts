//Dependencias
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"

/**
 * 404 Resquest handler
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
const notFound404 = (req: Request, res: Response): void => {
    res.status(StatusCodes.NOT_FOUND)
        .json({
            status: StatusCodes.NOT_FOUND,
            message: "Route of the api not found!!",
            resp: false
        });
};



//Exportacion del modulo
export default notFound404;