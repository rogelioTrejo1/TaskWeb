//Dependenses
import { Router } from "express";

//Inicialitation
const router: Router = Router();

//Principal routes
router.get('/', (req, res): void => {
    res.json({
        "message": "Welcome to my api!"
    })
});

//Export module
export default router;