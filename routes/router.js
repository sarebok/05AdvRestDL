import express from 'express';
import controllers from "../src/controllers/controllers.js"

const router = express.Router();

router.get('/', controllers.getDataWithQuery);
router.get('/joyas', controllers.getAllData);
router.get('/joyas/filtros', controllers.getDataFiltered);

export default router;

