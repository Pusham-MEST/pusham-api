import { Schema, model, Types } from "mongoose"
import { toJSON } from '@reis/mongoose-to-json'


// Define notification preferences schema
const notificationPreferencesSchema = new Schema({
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
    frequency: { type: String, enum: ['instant', 'daily', 'weekly'], default: 'instant' },
    types: [{ type: String, enum: ['outage', 'maintenance', 'general'], default: ['outage'] }]
  },{
    timestamps:true
  });


// Define user schema
const userSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
      // Array of neighborhood IDs or names
    neighborhoods: [{ type: String }],
    notificationPreferences: notificationPreferencesSchema
    
    },{
    timestamps:true
  });
 
  // Apply the toJSON plugin
  userSchema.plugin(toJSON)

    export const UserModel = model('User', userSchema);
    