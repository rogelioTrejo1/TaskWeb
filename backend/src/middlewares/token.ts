//Dependencias
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { verify } from "jsonwebtoken";
import keys from "../keys";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Verify request token
        const { authorization } = req.headers;
        if (authorization || authorization?.length) {

            // Get all information from token
            const token = verify(authorization, keys.secretToken)

            // Save infotmation in a local server variable
            req.app.locals.tokenInformation = token

            next();
        } else {
            res.status(StatusCodes.PAYMENT_REQUIRED)
                .json({
                    status: StatusCodes.PAYMENT_REQUIRED,
                    message: "Token does not exist!!",
                    resp: false
                })
        }
    } catch (error) {
        // Valid responce to client
        if (error.name)
            res.status(StatusCodes.NOT_ACCEPTABLE)
                .json({
                    status: StatusCodes.NOT_ACCEPTABLE,
                    message: `${error.message}!!`,
                    resp: false
                });
        else {
            // Show error
            console.error(error)

            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: "Internal Error!!!!",
                    resp: false,
                    error: keys.node_env === "d" ? error : null
                });
        }
            
    }

};

export default verifyToken;