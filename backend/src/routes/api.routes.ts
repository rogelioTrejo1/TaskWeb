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

import {
    getUsers
} from "../controllers/user.controllers";

//Rutas de la API
router.route('/task/:Id')
    .get(getTask)
    .delete(deleteTask);

router.route('/tasks')
    .get(getTasks)
    .post(postTask)
    .put(putTask);

router.get('/searchTask/:task', searchTask);
router.put('/putDone', putDone);

router.route("/users")
    .all((req, res, next) => {
        if(false)
            next();
        else
            res.json("error!!!");
    })
    .get(getUsers);

//Exportación del modulo
export default router;