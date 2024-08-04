import joi from "joi";


// export const userValidationSchema = joi.object({
//   firstName: joi.string().trim().optional(),
//   lastName: joi.string().trim().optional(),
//   userName: joi.string().trim().required().min(3).max(30).alphanum(),
//   email: joi.string().email().trim().lowercase().required(),
//   phoneNumber: joi.string().pattern(/^[0-9]+$/, 'numbers').optional(),
//   neighbourhoods: joi.array().items(joi.string().hex().length(24)).optional(), // Assuming ObjectId
//   outages: joi.array().items(joi.string().hex().length(24)).optional(), // Assuming ObjectId
//   password: joi.string().required().min(6).alphanum(),
//   resetPassword: joi.string().optional(), // Validation for encrypted data isn't needed as it's handled by encryption
//   resetPasswordExpiry: joi.date().optional(),
// });


// / Joi schema for User
export const userSchema = joi.object({
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  userName: joi.string().trim().required().min(3).max(30),
  email: joi.string().email().trim().required(),
  phoneNumber: joi.string().trim().optional(),
  neighbourhoods: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectIds
  outages: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)), // Array of ObjectIds
  password: joi.string().alphanum().min(6).required(),
  // confirmPassword: joi.string().valid(joi.ref('password')).required(), // Validates confirmPassword matches password
  resetPassword: joi.string().trim().optional(),
  resetPasswordExpiry: joi.date().optional(),
});


// joi schema for Outage
export const outageSchema = joi.object({
  neighbourhoodID: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), 
  // ObjectId
  startTime: joi.date().required(),
  endTime: joi.date().required(),
  status: joi.string().valid('Scheduled', 'Ongoing', 'Resolved').required(),
  affectedNeighbourhood: joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/)).optional(), 
  severity: joi.string().valid('Low', 'Medium', 'High').optional(),
  description: joi.string().trim().required(),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  // ObjectId
});


// joi schema for Neighbourhood
export const neighbourhoodSchema = joi.object({
  name: joi.string().trim().required(),
  region: joi.string().valid('Central Region', 'Greater Accra Region', 'Brong Ahafo Region', 'Eastern Region', 'Northern Region', 'Savannah Region', 'Bono East', 'Volta Region', 'Oti Region', 'Western North Region', 'East Region', 'Bono Region', 'Ahafo Region', 'Western Region', 'North-East Region'
  ).required(),
  city: joi.string().valid('Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast', 'Koforidua', 'Sunyani', 'Bolgatanga', 'Wa', 'Ho'
  ).required(),
  postcodeDistrict: joi.string().trim().optional(),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  // ObjectId
});

