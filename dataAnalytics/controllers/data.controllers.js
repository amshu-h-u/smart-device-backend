import Log from '../models/data.models.js';
import Device from '../../deviceManagement/models/device.model.js';
import mongoose from 'mongoose';

// POST /devices/:id/logs
export const createLog = async (req, res) => {
  try {
    const { event, value } = req.body;
    const { id } = req.params;

    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    const log = await Log.create({ device: id, event, value });
    res.status(201).json({ success: true, message: 'Log created', log });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /devices/:id/logs?limit=10
export const getLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const logs = await Log.find({ device: id })
      .sort({ timestamp: -1 })
      .limit(limit);

    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /devices/:id/usage?range=24h
export const getUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const range = req.query.range || '24h';

    // Parse range like '24h', '7d'
    const now = new Date();
    const hours = parseInt(range.replace('h', '')) || 24;
    const from = new Date(now.getTime() - hours * 60 * 60 * 1000);

    const result = await Log.aggregate([
      {
        $match: {
          device: new mongoose.Types.ObjectId(id),
          event: 'units_consumed',
          timestamp: { $gte: from }
        }
      },
      {
        $group: {
          _id: null,
          totalUnits: { $sum: '$value' }
        }
      }
    ]);

    res.json({
      success: true,
      device_id: id,
      total_units_last_24h: result[0]?.totalUnits || 0
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
