//Dependencias
import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult } from "typeorm";
import { StatusCodes } from "http-status-codes";
import { Task } from "../models/Task";
import keys from "../keys";

/**
 * Envia al cliente todas las tareas que se encuantran en la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress 
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        //Get all tasks in ther database
        const tasks: Task[] = await getRepository(Task).find({
            order: {
                Id: "DESC"
            }
        });

        information = {
            status: status = StatusCodes.OK,
            message: "Data successfully completed!",
            resp: true,
            body: tasks
        }
    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    //Send the response to client
    res.status(status).json(information);
};

/**
 * Envia solo una tarea de la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const getTask = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        const Id: string = req.params.Id;
        const task: Task | undefined = await getRepository(Task).findOne(Id);

        if (task)
            information = {
                status: status = StatusCodes.OK,
                message: "Data successfully consulted!!!!",
                resp: true,
                body: task
            };
        else
            information = {
                status: status = StatusCodes.NOT_FOUND,
                message: "Taks not found!",
                resp: false,
            };

    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    res.status(status).json(information);
};

/**
 * Crea una nueva tarea en la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const postTask = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        const { task, delivery_Date, description }: Task = req.body;
        const valueDate: Date = new Date(delivery_Date);
        const newTask = await getRepository(Task).save({ task, delivery_Date: valueDate, description });

        //Set the information to client
        information = {
            status: status = StatusCodes.CREATED,
            message: "Successfully created data!!!",
            resp: true,
            body: newTask
        }
    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    //Send the responce to client
    res.status(status).json(information);
};

/**
 * Actualiza una tarea en la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const putTask = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        const { Id, task, delivery_Date, description }: Task = req.body;
        const oldTask: Task | undefined = await getRepository(Task).findOne(Id);
        if (oldTask) {
            const putTask: UpdateResult = await getRepository(Task).update(oldTask, { task, delivery_Date, description });
            information = {
                status: status = StatusCodes.OK,
                message: "Successfully updated data!!!!!",
                resp: true,
                body: putTask
            }
        } else {
            information = {
                status: status = StatusCodes.NOT_FOUND,
                message: "Error, no user exists",
                resp: false
            }
        }

    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    //Send the responce to client
    res.status(status).json(information);
};

/**
 * Elimina una tarea de la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        const Id: string = req.params.Id
        const deleteTask: DeleteResult = await getRepository(Task).delete(Id);

        information = {
            status: status = StatusCodes.ACCEPTED,
            message: "Successfully deleted data!!!!!",
            resp: true,
            body: deleteTask
        }
    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    //Send the responce to client
    res.status(status).json(information);
};

/**
 * Busca una tarea en la base de datos mediente su nombre
 * @param req Request Object from Express
 * @param res Responce Object from Express 
 */
export const searchTask = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        const task: string = req.params.task;
        const searchTask: Task = await getRepository(Task)
            .query('SELECT * FROM task WHERE task LIKE ?', [`%${task}%`]);

        information = {
            status: status = StatusCodes.OK,
            message: "Data succesfuly searched!!!",
            resp: true,
            body: searchTask
        };


    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    //Send the responce to client
    res.status(status).json(information);
};

/**
 * Update the state of the task in ther database
 * @param req Request Object from Express
 * @param res Responce Object from Express
 */
export const putDone = async (req: Request, res: Response): Promise<void> => {
    //Instances
    let information: IInformatiton = {};
    let status: number;

    try {
        const { Id, done }: Task = req.body;
        const task: Task | undefined = await getRepository(Task).findOne({ Id });

        if (task) {
            const putDone: UpdateResult = await getRepository(Task).update(task, { done });

            information = {
                status: status = StatusCodes.ACCEPTED,
                message: "Data succesfuly updated!!!",
                resp: true,
                body: putDone
            };
        } else {
            information = {
                status: status = StatusCodes.NOT_FOUND,
                message: "Task not exist!!!",
                resp: false
            };
        }

    } catch (error) {
        //Set the error information to client
        information = {
            status: status = StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Errror",
            resp: false,
            error: keys.node_env == 'd' ? error : null
        }

        //Print Error
        console.log(error);
    }

    //Send the responce to client
    res.status(status).json(information);
};

//Interface
interface IInformatiton {
    status?: number;
    resp?: boolean;
    message?: string;
    body?: Task | Task[] | UpdateResult | DeleteResult;
    error?: Error | null;
}
