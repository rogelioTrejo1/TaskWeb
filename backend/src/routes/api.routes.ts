//Dependencias 
import { Router } from "express";

//Inicializaciones
const router: Router = Router();

//Controladores
import {
    getTasks,
    getTask,
    postTask,
    putTask,
    deleteTask,
    searchTask,
    putDone
} from "../controllers/tasks.controllers";

import { login, register } from "../controllers/login.controller";
import notFound404 from "../middlewares/400notFound";
import verifyToken from "../middlewares/token";

// Login and Register
router.post("/register", register);
router.post("/login", login);

// Tasks routes
router.route('/task/:id')
    .get(verifyToken, getTask)
    .put(verifyToken, putTask)
    .delete(deleteTask);

router.route('/tasks')
    .get(verifyToken, getTasks)
    .post(verifyToken, postTask)

router.get('/searchTask/:task', verifyToken, searchTask);
router.put('/putDone/:id', putDone);

// 404 not foud handdler
router.all("*", notFound404);

//Exportación del modulo
export default router;