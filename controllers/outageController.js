import { Outage } from '../models/outage.js';


// Get all outages
export const getAllOutages = async (req, res) => {
  try {
    const outages = await Outage.find();
    res.json(outages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a specific outage by ID
export const getOutageById = async (req, res) => {
  try {
    const outage = await Outage.findById(req.params.id);
    if (!outage) return res.status(404).json({ message: 'Outage not found' });
    res.json(outage);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new outage
export const createOutage = async (req, res) => {
  try {
    const newOutage = new Outage(req.body);
    await newOutage.save();
    res.status(201).json(newOutage);
  } catch (err) {
    res.status(400).json({ message: 'Error creating outage', error: err.message });
  }
};

// Update an existing outage
export const updateOutage = async (req, res) => {
  try {
    const updatedOutage = await Outage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOutage) return res.status(404).json({ message: 'Outage not found' });
    res.json(updatedOutage);
  } catch (err) {
    res.status(400).json({ message: 'Error updating outage', error: err.message });
  }
};

// Delete an outage
export const deleteOutage = async (req, res) => {
  try {
    const deletedOutage = await Outage.findByIdAndDelete(req.params.id);
    if (!deletedOutage) return res.status(404).json({ message: 'Outage not found' });
    res.json({ message: 'Outage deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
