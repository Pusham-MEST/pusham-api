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
  region: { type: String, enum: ['Central Region', 'Greater Accra Region', 'Brong Ahafo Region', 'Eastern Region', 'Northern Region', 'Savannah Region', 'Bono East', 'Volta Region', 'Oti Region', 'Western North Region', 'East Region', 'Bono Region', 'Ahafo Region', 'Western Region', 'North-East Region' ], required: true },
  city: {type: String, enum: [ 'Accra', 'Kumasi', 'Tamale', 'Takoradi','CapeCoast','Koforidua','Sunyani','Bolgatanga','Wa','Ho'], required: true},
  postcodeDistrict: { type: String, trim: true }, 
  user: { type: Types.ObjectId, ref: 'User', select: false }
}, {
  timestamps: true
});


neighbourhoodSchema.plugin(toJSON)


export const Neighbourhood = model('Neighbourhood', neighbourhoodSchema);