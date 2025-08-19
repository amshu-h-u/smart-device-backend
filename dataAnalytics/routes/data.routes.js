import express from 'express';
import { createLog, getLogs, getUsage } from '../controllers/data.controllers.js';
import { createLogSchema } from '../validators/data.validate.js';
import { validateBody } from '../middlewares/validate.js';

const router = express.Router();

router.post('/devices/:id/logs', validateBody(createLogSchema), createLog);
router.get('/devices/:id/logs', getLogs);
router.get('/devices/:id/usage', getUsage);

export default router;
