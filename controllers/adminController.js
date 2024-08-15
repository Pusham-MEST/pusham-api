import { Outage } from '../models/outage.js';
import { Neighbourhood } from '../models/neighbourhood.js';
import { getAutocompleteSuggestions, getPlaceDetails } from '../services/locationService.js';

export const createOutage = async (req, res) => {
  try {
    const { neighbourhoodID, startTime, endTime, status, description } = req.body;
    
    const newOutage = new Outage({
      neighbourhoodID,
      startTime,
      endTime,
      status,
      description,
    });
    
    await newOutage.save();
    res.status(201).json(newOutage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOutage = async (req, res) => {
  try {
    const { id } = req.params;
    await Outage.findByIdAndDelete(id);
    res.status(200).json({ message: 'Outage deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const autocompleteLocation = async (req, res) => {
  try {
    const suggestions = await getAutocompleteSuggestions(req.query.input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaceDetailsById = async (req, res) => {
  try {
    const details = await getPlaceDetails(req.query.placeId);
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
