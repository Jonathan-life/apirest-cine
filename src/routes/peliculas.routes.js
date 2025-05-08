import { Router } from "express";
import { createPeliculas, deletePeliculas, getPeliculas, getPeliculasByID, updatePeliculas } from "../controllers/peliculas.controller.js";

const router = Router()

//verbos
//APIREST
router.get('/peliculas', getPeliculas )
router.get('/peliculas/:id', getPeliculasByID)


router.post('/peliculas', createPeliculas )

router.put('/peliculas/:id', updatePeliculas )

router.delete('/peliculas/:id', deletePeliculas )

export default router

