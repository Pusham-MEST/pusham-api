import { Neighbourhood } from '../models/neighbourhood.js';
import { neighbourhoodSchema } from '../schema/schema.js';
import { Outage } from '../models/outage.js';
import joi from 'joi';

// Function to get all neighborhoods and their respective outages
// export const getAllData = async (req, res) => {
//   try {
//     // Fetch all neighborhoods
//     const neighborhoods = await Neighborhood.find();

//     // Fetch all outages
//     const outages = await Outage.find().populate('neighborhoodID');

//     // Send the data as a response
//     res.json({ neighborhoods, outages });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // ONE
// // Get MainPage data
// export const getMainPageData = async (req, res) => {
//   try {
//     const mainPage = await MainPage.findOne()
//       .populate('featuredNeighborhoods')
//       .populate('recentOutages')
//       .exec();
//     res.json(mainPage);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching main page data', error: err.message });
//   }
// };



// // Function to get neighborhood-specific outages for a user based on their location
// export const getUserHomeData = async (req, res) => {
//   try {
//     const { user } = req; 
//     // Assuming user is attached to req object via authentication middleware
//     const neighborhoods = user.neighborhoods; 
//     // Array of user's subscribed neighborhoods

//     // Fetch outages for the user's neighborhoods
//     const outages = await Outage.find({ neighborhoodID: { $in: neighborhoods } }).populate('neighborhoodID');

//     // Send the data as a response
//     res.json({ neighborhoods, outages });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




export const search = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Neighbourhood.find({ name: new RegExp(query, 'i') });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};``





// Create a new neighbourhood
export const createNeighbourhood = async (req, res) => {
  try {
    const { error, value } = neighbourhoodSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

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

