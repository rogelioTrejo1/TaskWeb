//Dependeses
import { Request, Response } from "express";

/**
 * Handle of response 404 of the api
 * @param req Request Object from Express
 * @param res Responce Object from Express
 */
const notFound404 = (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: "Route of the api not found!!",
        resp: false
    });
};

//Export Module
export default notFound404;