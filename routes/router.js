import express from 'express';
import controllers from "../src/controllers/controllers.js"

const router = express.Router();

router.get('/', controllers.getData);

export default router;

