import { Schema, model, Types } from "mongoose"
import { toJSON } from '@reis/mongoose-to-json'


// Define notification preferences schema with email only
const notificationPreferencesSchema = new Schema({
  email: { type: Boolean, default: true },
  frequency: { type: String, enum: ['Instant', 'Daily', 'Weekly'], default: 'Instant' },
  types: [{ type: String, enum: ['Outage', 'Maintenance', 'General'], default: ['Outage'] }]
}, {
  timestamps: true
});


// Define user schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false, trim: true },
  notificationPreferences: notificationPreferencesSchema,
  // Full address from Google Maps
  location: {
    type: { type: String, default: 'Point' }, coordinates: { type: [Number], required: true }, address: { type: String, required: true },
    // Google Place ID for more precise location identification 
    placeId: { type: String },
    // Link to a neighbourhood
    neighbourhood: { type: Types.ObjectId, ref: 'Neighbourhood', required: true }
  },
  outages: [{ type: Types.ObjectId, ref: 'Outage' }],
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, {
  timestamps: true
});

//reset token model 
const resetTokenSchema = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
  expired: { type: Boolean, default: false },
  expiredAt: {
    type: Date,
    default: () => new Date().setHours(new Date().getHours() + 2)
  }

}, {
  timestamps: true
})


// Apply the toJSON plugin
userSchema.plugin(toJSON)
resetTokenSchema.plugin(toJSON)

export const resetTokenModel = model('resetToken', resetTokenSchema)
export const UserModel = model('User', userSchema);
