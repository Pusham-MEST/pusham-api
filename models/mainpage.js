import { Schema, model} from 'mongoose';
import {Neighbourhood} from './neighbourhood.js';
import Outage from './outages.js';

const mainPageSchema = new Schema({
  featuredNeighborhoods: [{ type: Schema.Types.ObjectId, ref: 'Neighbourhood' }],
  recentOutages: [{ type: Schema.Types.ObjectId, ref: 'Outage' }],
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

export const MainPage = model('MainPage', mainPageSchema);
