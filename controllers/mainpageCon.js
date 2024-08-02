import { MainPage } from '../models/mainPage.js';
import {neighborhood} from '../models/neighbourhood.js';
import { Outage } from '../models/outage.js';

// Get MainPage data
export const getMainPageData = async (req, res) => {
  try {
    const mainPage = await MainPage.findOne()
      .populate('featuredNeighborhoods')
      .populate('recentOutages')
      .exec();
    res.json(mainPage);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching main page data', error: err.message });
  }
};

// Update featured neighborhoods and recent outages
export const updateMainPage = async (req, res) => {
  const { featuredNeighborhoods, recentOutages } = req.body;

  try {
    const mainPage = await MainPage.findOne();
    if (!mainPage) {
      const newMainPage = new MainPage({ featuredNeighborhoods, recentOutages });
      await newMainPage.save();
      res.status(201).json(newMainPage);
    } else {
      mainPage.featuredNeighborhoods = featuredNeighborhoods || mainPage.featuredNeighborhoods;
      mainPage.recentOutages = recentOutages || mainPage.recentOutages;
      mainPage.updatedAt = Date.now();
      await mainPage.save();
      res.json(mainPage);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating main page', error: err.message });
  }
};

// Add a new featured neighborhood
export const addFeaturedNeighborhood = async (req, res) => {
  const { neighborhoodId } = req.body;

  try {
    const mainPage = await MainPage.findOne();
    if (!mainPage) {
      const newMainPage = new MainPage({ featuredNeighborhoods: [neighborhoodId] });
      await newMainPage.save();
      res.status(201).json(newMainPage);
    } else {
      if (!mainPage.featuredNeighborhoods.includes(neighborhoodId)) {
        mainPage.featuredNeighborhoods.push(neighborhoodId);
        mainPage.updatedAt = Date.now();
        await mainPage.save();
        res.json(mainPage);
      } else {
        res.status(400).json({ message: 'Neighborhood already featured' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Error adding featured neighborhood', error: err.message });
  }
};

// Remove a featured neighborhood
export const removeFeaturedNeighborhood = async (req, res) => {
  const { neighborhoodId } = req.params;

  try {
    const mainPage = await MainPage.findOne();
    if (!mainPage) {
      res.status(404).json({ message: 'Main page not found' });
    } else {
      mainPage.featuredNeighborhoods = mainPage.featuredNeighborhoods.filter(
        id => id.toString() !== neighborhoodId
      );
      mainPage.updatedAt = Date.now();
      await mainPage.save();
      res.json(mainPage);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error removing featured neighborhood', error: err.message });
  }
};

// Add a new recent outage
export const addRecentOutage = async (req, res) => {
  const { outageId } = req.body;

  try {
    const mainPage = await MainPage.findOne();
    if (!mainPage) {
      const newMainPage = new MainPage({ recentOutages: [outageId] });
      await newMainPage.save();
      res.status(201).json(newMainPage);
    } else {
      if (!mainPage.recentOutages.includes(outageId)) {
        mainPage.recentOutages.push(outageId);
        mainPage.updatedAt = Date.now();
        await mainPage.save();
        res.json(mainPage);
      } else {
        res.status(400).json({ message: 'Outage already listed as recent' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Error adding recent outage', error: err.message });
  }
};

// Remove a recent outage
export const removeRecentOutage = async (req, res) => {
  const { outageId } = req.params;

  try {
    const mainPage = await MainPage.findOne();
    if (!mainPage) {
      res.status(404).json({ message: 'Main page not found' });
    } else {
      mainPage.recentOutages = mainPage.recentOutages.filter(
        id => id.toString() !== outageId
      );
      mainPage.updatedAt = Date.now();
      await mainPage.save();
      res.json(mainPage);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error removing recent outage', error: err.message });
  }
};
