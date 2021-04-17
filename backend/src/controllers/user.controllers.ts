//Dependencias
import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import keys from "../keys";

/**
 * Get All Users in the database
 * @param req Object Request to Express
 * @param res Object Responce to Express
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    res.json({"uses": "hola"})                           
};

//Interface
interface IInformatiton {
    status?: number;
    resp?: boolean;
    message?: string;
    body?: User | User[] | UpdateResult | DeleteResult;
    error?: Error | null;
}