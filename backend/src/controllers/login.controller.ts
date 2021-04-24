// Dependencias
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { v1 as uuid } from "uuid";
import { User } from "../models/User";
import { comparePassword, encryptPassword } from "../libs/bcrypt"
import keys from "../keys";

/**
 * Logged an user to application
 * @param req Object Request to Express
 * @param res Object Response to Espress 
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Search user in database
        const user: User | undefined = await getRepository(User).findOne({
            where: {
                username
            }
        });

        // Valid user search
        if (user) {
            // Verify password
            const isValid = await comparePassword(user.password, password);
            if (isValid)
                res.status(StatusCodes.OK)
                    .header({
                        "X-Access-Token": sign({ userId: user.id }, keys.secretToken, {
                            expiresIn: 60 * 60 * 24
                        })
                    })
                    .json({
                        status: StatusCodes.CREATED,
                        message: "Satisfactorily logged user!",
                        resp: true
                    })
            else 
                res.status(StatusCodes.UNAUTHORIZED)
                    .json({
                        status: StatusCodes.UNAUTHORIZED,
                        message: "The password is not correct!!",
                        resp: false
                    });

        } else {
            res.status(StatusCodes.NOT_FOUND)
                    .json({
                        status: StatusCodes.NOT_FOUND,
                        message: "User not found!!",
                        resp: false
                    });
        }

    } catch (error) {
        // Send responce to client
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Errror",
                resp: false,
                error: keys.node_env == 'd' ? error : null
            })

        // Show error!
        console.error(error);
    }
};

/**
 * Register an user to application
 * @param req Object Request to Express
 * @param res Object Response to Espress 
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, email } = req.body;

        // Search user in database
        const user: User | undefined = await getRepository(User).findOne({
            where: {
                username
            }
        });

        // Valid user search
        if (!user) {
            // Create a new user
            const user: User = new User();
            user.id = uuid()
            user.username = username;
            user.password = await encryptPassword(password);
            user.email = email;

            // Save new user
            const newUser = await getRepository(User).save(user);

            // Send responce to client!
            res.status(StatusCodes.CREATED)
                .header({
                    "X-Access-Token": sign({ userId: newUser.id }, keys.secretToken, {
                        expiresIn: 60 * 60 * 24
                    })
                })
                .json({
                    status: StatusCodes.CREATED,
                    message: "Satisfactorily registered user!",
                    resp: true
                })

        } else {
            // Send an error to client
            res.status(StatusCodes.NOT_ACCEPTABLE)
                .json({
                    status: StatusCodes.NOT_ACCEPTABLE,
                    message: "Existing user!",
                    resp: false
                })
        }

    } catch (error) {
        // Send responce to client
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Errror",
                resp: false,
                error: keys.node_env == 'd' ? error : null
            })

        // Show error!
        console.error(error);
    }
};