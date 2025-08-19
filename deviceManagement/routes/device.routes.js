import express from 'express';
import {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
  updateHeartbeat
} from '../controller/device.controller.js';

import { validateBody } from '../middlewares/validate.js';

import {
  createDeviceSchema,
  updateDeviceSchema,
  heartbeatSchema
} from '../validators/device.validators.js';

const router = express.Router();

router.post('/', validateBody(createDeviceSchema),createDevice);
router.get('/', getDevices);
router.patch('/:id', validateBody(updateDeviceSchema),updateDevice);
router.delete('/:id', deleteDevice);
router.post('/:id/heartbeat',validateBody(heartbeatSchema), updateHeartbeat);

export default router;
