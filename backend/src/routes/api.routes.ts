//Dependeses 
import { Router } from "express";

//Inicialization
const router: Router = Router();

//Controllers
import { getTasks, getTask, postTask, putTask, deleteTask, searchTask, putDone } from "../controllers/tasks.controllers";
import notFound404 from "../middlewares/400notFound";

//Controllers
router.route('/task/:Id')
    .get(getTask)
    .delete(deleteTask);

router.route('/tasks')
    .get(getTasks)
    .post(postTask)
    .put(putTask);

router.get('/searchTask/:task', searchTask);
router.put('/putTask', putDone);

router.route('*')
    .get(notFound404)
    .post(notFound404)
    .put(notFound404)
    .delete(notFound404);

//Export module
export default router;