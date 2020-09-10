//Dependencias
import { Router } from "express";

//Inicializaciones
const router: Router = Router();

//Ruta principal
router.get('/', (req, res): void => {
    res.json({
        "message": "Welcome to my api!"
    })
});

//Exportación del modulo 
export default router;