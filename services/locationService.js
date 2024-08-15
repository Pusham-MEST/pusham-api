import axios from 'axios';

export const getAutocompleteSuggestions = async (input) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
    params: {
      input,
      key: process.env.GOOGLE_API_KEY,
    },
  });
  return response.data;
};

export const getPlaceDetails = async (placeId) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
    params: {
      place_id: placeId,
      key: process.env.GOOGLE_API_KEY,
    },
  });
  return response.data;
};
