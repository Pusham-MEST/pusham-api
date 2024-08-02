import Neighborhood from '../models/neighborhood.js';
import Outage from '../models/outage.js';

// Function to get all neighborhoods and their respective outages
export const getAllData = async (req, res) => {
  try {
    // Fetch all neighborhoods
    const neighborhoods = await Neighborhood.find();

    // Fetch all outages
    const outages = await Outage.find().populate('neighborhoodID');

    // Send the data as a response
    res.json({ neighborhoods, outages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get neighborhood-specific outages for a user based on their location
export const getUserHomeData = async (req, res) => {
  try {
    const { user } = req; // Assuming user is attached to req object via authentication middleware
    const neighborhoods = user.neighborhoods; // Array of user's subscribed neighborhoods

    // Fetch outages for the user's neighborhoods
    const outages = await Outage.find({ neighborhoodID: { $in: neighborhoods } }).populate('neighborhoodID');

    // Send the data as a response
    res.json({ neighborhoods, outages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
