import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';


// const neighbourhoodSchema = new Schema({
//   name: { type: String, required: true },
//   region: { type: String, required: true },
//   city: { type: String, required: true },
// });

// export const Neigbourhood = model('Neighbourhood', neighbourhoodSchema);



const neighbourhoodSchema = new Schema({
  name: { type: String, required: true, trim: true },
  // Google Place ID for unique identification
  placeId: { type: String, required: true, unique: true }, 
  location: {
    // GeoJSON type for location
    type: { type: String, default: 'Point' }, 
    // [longitude, latitude]
    coordinates: { type: [Number], required: true }, 
    // Full address from Google Maps
    address: { type: String, required: true }, 
  }
}, {
  timestamps: true
});








// const neighbourhoodSchema = new Schema({
//   name: { type: String, required: true, trim: true },
//   // region: { type: String, enum: ['Central Region', 'Greater Accra Region', 'Brong Ahafo Region', 'Eastern Region', 'Northern Region', 'Savannah Region', 'Bono East', 'Volta Region', 'Oti Region', 'Western North Region', 'East Region', 'Bono Region', 'Ahafo Region', 'Western Region', 'North-East Region' ], required: true },
//   // city: {type: String, enum: [ 'Accra', 'Kumasi', 'Tamale', 'Takoradi','CapeCoast','Koforidua','Sunyani','Bolgatanga','Wa','Ho'], required: true},
//   coordinates: { type: { type: String, default: 'Point' }, coordinates: { type: [Number],  required: false }},
  
//   location: { type: { type: String, default: 'Point' }, coordinates: { type: [Number],  required: true }, 
//   // [longitude, latitude]
//     address: { type: String, required: true }, 
//     // Full address from Google Maps 
//     placeId: { type: String } 
//     // Google Place ID for more precise location identification
// },
//   }, {
//   timestamps: true
// });


neighbourhoodSchema.plugin(toJSON)
// Index for geo-spatial queries
neighbourhoodSchema.index({ location: '2dsphere' }); 

export const Neighbourhood = model('Neighbourhood', neighbourhoodSchema);