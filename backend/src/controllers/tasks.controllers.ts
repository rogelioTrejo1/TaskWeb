//Dependencias
import { Request, Response } from "express";
import { getRepository, UpdateResult, DeleteResult, Like } from "typeorm";
import { StatusCodes } from "http-status-codes";
import { Task } from "../models/Task";
import keys from "../keys";

/**
 * Get all 
 * @param req Object Request to Express
 * @param res Object Response to Espress 
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get user id
        const { userId } = req.app.locals.tokenInformation;

        // Search all tasks from user
        const tasks: Task[] = await getRepository(Task).find({
            where: {
                user: {
                    id: userId
                }
            },
            order: {
                delivery_Date: "DESC"
            }
        })

        // Send information to client
        res.status(StatusCodes.OK)
            .json({
                status: StatusCodes.OK,
                message: "Information consulted satisfactorily",
                resp: true,
                body: tasks
            });

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
 * Envia solo una tarea de la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all params
        const { id } = req.params;

        // Search all tasks from user
        const task: Task | undefined = await getRepository(Task).findOne(id);


        // Valid responce
        if (task)
            res.status(StatusCodes.OK)
                .json({
                    status: StatusCodes.OK,
                    message: "Information consulted satisfactorily",
                    resp: true,
                    body: task
                });
        else
            res.status(StatusCodes.NOT_FOUND)
                .json({
                    status: StatusCodes.NOT_FOUND,
                    message: "Task not found!!!",
                    resp: false,
                });

    } catch (error) {
        // Send responce to client
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Errror",
                resp: false,
                error: keys.node_env == 'd' ? error : null
            });

        // Show error!
        console.error(error);
    }
};

/**
 * Crea una nueva tarea en la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const postTask = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get user id
        const { userId } = req.app.locals.tokenInformation;

        // Get request body
        const { task, description, delivery_Date } = req.body;

        // Create the new task
        const newTask: Task = await getRepository(Task).save({
            task,
            description,
            delivery_Date,
            user: {
                id: userId
            }
        });

        // Send responce to client
        res.status(StatusCodes.CREATED)
            .json({
                status: StatusCodes.CREATED,
                message: "Task created successfully!!",
                resp: true,
                body: newTask
            });
    } catch (error) {
        // Send responce to client
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Internal Errror",
                resp: false,
                error: keys.node_env == 'd' ? error : null
            });

        // Show error!
        console.error(error);
    }
};

/**
 * Actualiza una tarea en la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const putTask = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all params
        const { id } = req.params;

        // Get request body
        const { task, description, delivery_Date } = req.body;

        // Search the task
        const searchTask: Task | undefined = await getRepository(Task).findOne(id);

        // Valid task
        if (searchTask) {
            // update task
            const result: UpdateResult = await getRepository(Task).update(id, {
                task,
                description,
                delivery_Date
            });

            // Send menssage to client
            res.status(StatusCodes.OK)
                .json({
                    status: StatusCodes.OK,
                    message: "Task updated successfully",
                    resp: true,
                    body: result
                });

        } else {
            res.status(StatusCodes.NOT_FOUND)
                .json({
                    status: StatusCodes.NOT_FOUND,
                    message: "Task not found!!",
                    resp: false,
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
 * Elimina una tarea de la base de datos
 * @param req Obejeto Request de Express
 * @param res Objeto Response de Espress
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all params
        const { id } = req.params;

        // Search the task
        const searchTask: Task | undefined = await getRepository(Task).findOne(id);

        // Valid task
        if (searchTask) {
            // Delete task
            const result: DeleteResult = await getRepository(Task).delete(id);

            // Send menssage to client
            res.status(StatusCodes.OK)
                .json({
                    status: StatusCodes.OK,
                    message: "Task updated successfully",
                    resp: true,
                    body: result
                });

        } else {
            res.status(StatusCodes.NOT_FOUND)
                .json({
                    status: StatusCodes.NOT_FOUND,
                    message: "Task not found!!",
                    resp: false,
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
 * Busca una tarea en la base de datos mediente su nombre
 * @param req Request Object from Express
 * @param res Responce Object from Express 
 */
export const searchTask = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get user id
        const { userId } = req.app.locals.tokenInformation;

        // Get task param
        const { task } = req.params;

        // Search all task to start with request params
        const tasks = await getRepository(Task).find({
            where: {
                task: Like(`%${task}%`),
                user: {
                    id: userId
                }
            }
        });

        // Send information to client
        res.status(StatusCodes.OK)
            .json({
                status: StatusCodes.OK,
                message: "Information consulted satisfactorily",
                resp: true,
                body: tasks
            });

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
 * Update the state of the task in ther database
 * @param req Request Object from Express
 * @param res Responce Object from Express
 */
export const putDone = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all params
        const { id } = req.params;

        // Search the task
        const searchTask: Task | undefined = await getRepository(Task).findOne(id);

        // Valid task
        if (searchTask) {
            // Update state of the task
            searchTask.done = !searchTask.done
            const result: UpdateResult = await getRepository(Task).update(id, searchTask);

            // Send information to client
            res.status(StatusCodes.OK)
                .json({
                    status: StatusCodes.OK,
                    message: "Information consulted satisfactorily",
                    resp: true,
                    body: result
                });

        } else {
            res.status(StatusCodes.NOT_FOUND)
                .json({
                    status: StatusCodes.NOT_FOUND,
                    message: "Task not found!!",
                    resp: false,
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