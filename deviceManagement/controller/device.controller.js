import Device from "../models/device.model.js";

// Register new device
export const createDevice = async (req, res) => {
  try {
    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List devices (with optional filters)
export const getDevices = async (req, res) => {
  const { type, status } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;

  try {
    const devices = await Device.find(filter);
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update device
export const updateDevice = async (req, res) => {
  try {
    const updated = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Device not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete device
export const deleteDevice = async (req, res) => {
  try {
    const deleted = await Device.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Device not found' });
    res.json({ message: 'Device removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Heartbeat update
// POST /devices/:id/heartbeat
export const updateHeartbeat = async (req, res) => {
  try {
    const { status } = req.body;
    const now = new Date();

    const device = await Device.findByIdAndUpdate(
      req.params.id,
      {
        status,
        last_active_at: now
      },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    res.json({
      success: true,
      message: 'Device heartbeat recorded',
      last_active_at: device.last_active_at
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
