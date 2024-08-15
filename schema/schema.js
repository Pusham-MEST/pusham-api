import joi from "joi";



// Registration validator 
// export const registerValidator=  joi.object({
//   firstName: joi.string().required(),
//   lastName: joi.string().required(),
//   userName: joi.string().required().min(3).max(30),
//   email: joi.string().email().required(),
//   phoneNumber: joi.string().optional(),
//   password: joi.string().required(),
// })

// Location schema
const locationSchema = joi.object({
  type: joi.string().valid('Point').default('Point').required(),
  coordinates: joi.array().items(joi.number()).length(2).required().messages({
    'array.length': 'Coordinates must contain exactly two numbers (longitude, latitude)',
    'any.required': 'Coordinates are required'
  }),
  address: joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required'
  })
});


// Registration validator
export const registerValidator = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  userName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().optional(),
  password: joi.string().required(),
  location: locationSchema.required()
});



// joi schema for user

// export const userSchema = joi.object({
//   firstName: joi.string().trim().required(),
//   lastName: joi.string().trim().required(),
//   userName: joi.string().trim().required().min(3).max(30),
//   email: joi.string().email().trim().required(),
//   phoneNumber: joi.string().trim().optional(),
//   password: joi.string().required(),
//   // password: joi.string().alphanum().min(6).required(),
//   resetPassword: joi.string().trim().optional(),
//   resetPasswordExpiry: joi.date().optional(),
// });


export const userSchema = joi.object({
  firstName: joi.string().required().trim().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required',
  }),
  lastName: joi.string().required().trim().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required',
  }),
  userName: joi.string().required().trim().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required',
  }),
  email: joi.string().email().required().trim().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  phoneNumber: joi.string().optional().trim(),
  password: joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  
  resetPasswordToken: joi.string().optional(),
  resetPasswordExpires: joi.date().optional(),
});



// Joi schema for Outage
export const outageSchema = joi.object({
  startTime: joi.date().required().messages({
    'date.base': 'Start time must be a valid date',
    'any.required': 'Start time is required',
  }),
  endTime: joi.date().required().messages({
    'date.base': 'End time must be a valid date',
    'any.required': 'End time is required',
  }),
  status: joi.string().valid('Active', 'Resolved', 'Pending').required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required',
    'string.valid': 'Status must be one of the following: Active, Resolved, Pending',
  }),
  affectedNeighbourhoods: joi.array().items(
    joi.string().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.message('Affected neighbourhood must be a valid ObjectId');
      }
      return value;
    })
  ).required().messages({
    'array.includesRequiredUnknowns': 'Affected neighbourhoods must contain valid ObjectIds',
    'any.required': 'Affected neighbourhoods are required',
  }),
  severity: joi.string().valid('Low', 'Medium', 'High').required().messages({
    'string.empty': 'Severity is required',
    'any.required': 'Severity is required',
    'string.valid': 'Severity must be one of the following: Low, Medium, High',
  }),
  region: joi.string().optional(),
  city: joi.string().optional(),
});




// Neighbourhood schema
export const neighbourhoodSchema = joi.object({
  name: joi.string().trim().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  placeId: joi.string().required().messages({
    'string.empty': 'Place ID is required',
    'any.required': 'Place ID is required'
  }),
  location: locationSchema.required().messages({
    'object.base': 'Location is required',
    'any.required': 'Location is required'
  })
});


