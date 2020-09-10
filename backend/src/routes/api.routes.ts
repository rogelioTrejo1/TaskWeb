//Dependencias 
import { Router } from "express";

//Inicializaciones
const router: Router = Router();

//Controladores
import { getTasks, getTask, postTask, putTask, deleteTask, searchTask, putDone } from "../controllers/tasks.controllers";

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

//Exportación del modulo
export default router;