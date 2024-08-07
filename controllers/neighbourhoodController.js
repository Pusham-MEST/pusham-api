import { Neighbourhood } from '../models/neighbourhood.js';
import { neighbourhoodSchema } from '../schema/schema.js';
import { Outage } from '../models/outage.js';
import joi from 'joi';

// export const search = async (req, res) => {
//   try {
//     const { query } = req.query;
//     const results = await Neighbourhood.find({ name: new RegExp(query, 'i') });
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };``





// Create a new neighbourhood
export const createNeighbourhood = async (req, res) => {
  try {
    const { error, value } = neighbourhoodSchema.validate(req.body);
    if (error){ 
            return res.status(400).send(error.details[0].message);
    }
    const neighbourhood = new Neighbourhood(value);
    await neighbourhood.save();
    res.status(201).json(neighbourhood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Get all neighbourhoods
export const getNeighbourhoods = async (req, res) => {
  try {
    const neighbourhoods = await Neighbourhood.find();
    res.status(200).json(neighbourhoods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a neighbourhood by ID
export const getNeighbourhoodById = async (req, res) => {
  try {
    const neighbourhood = await Neighbourhood.findById(req.params.id);
    if (!neighbourhood) return res.status(404).json({ message: 'Neighbourhood not found' });
    res.status(200).json(neighbourhood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a neighbourhood by ID
export const updateNeighbourhood = async (req, res) => {
  try {
    const { error, value } = neighbourhoodSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const neighbourhood = await Neighbourhood.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!neighbourhood) return res.status(404).json({ message: 'Neighbourhood not found' });
    res.status(200).json(neighbourhood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a neighbourhood by ID
export const deleteNeighbourhood = async (req, res) => {
  try {
    const neighbourhood = await Neighbourhood.findByIdAndDelete(req.params.id);
    if (!neighbourhood) return res.status(404).json({ message: 'Neighbourhood not found' });
    res.status(200).json({ message: 'Neighbourhood deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




//  Get all outages affecting a specific neighborhood
export const getOutagesByNeighbourhood = async (req, res) => {
  try {
    const { id } = req.params; // id is the neighborhood ID
    const outages = await Outage.find({ affectedNeighbourhoods: id }).populate('affectedNeighbourhoods').populate('neighbourhoodID');
    
    if (!outages.length) {
      return res.status(404).json({ message: 'No outages found for this neighborhood.' });
    }
    
    res.status(200).json(outages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

