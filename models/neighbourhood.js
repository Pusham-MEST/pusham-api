import { Schema, model } from 'mongoose';

const neighbourhoodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // more fields to be added
});

export const Neibourhood = model('Neighbourhood', neighbourhoodSchema);