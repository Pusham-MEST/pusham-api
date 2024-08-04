import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';


const outageSchema = new Schema({
  neighbourhoodID: { type: Schema.Types.ObjectId, ref: 'Neighbourhood', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['Scheduled', 'Ongoing', 'Resolved'], required: true },
  // List of affected areas or neighborhoods
  affectedNeighbourhood: [{ type: Schema.Types.ObjectId, ref: 'Neighbourhood', required: false }], 
  severity: { type: String, enum: ['Low', 'Medium', 'High'], required: false },
  description: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User',select:false }
},{
  timestamps:true
});


outageSchema.plugin(toJSON)

export const Outage = model('Outage', outageSchema);

