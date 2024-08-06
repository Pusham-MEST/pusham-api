import { Schema, model, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';


// Define notification preferences schema
// const notificationPreferencesSchema = new Schema({
//     email: { type: Boolean, default: true },
//     sms: { type: Boolean, default: false },
//     push: { type: Boolean, default: true },
//     frequency: { type: String, enum: ['instant', 'daily', 'weekly'], default: 'instant' },
//     types: [{ type: String, enum: ['outage', 'maintenance', 'general'], default: ['outage'] }]
//   },{
//     timestamps:true
//   });





// User schema
const userSchema = new Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  userName: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  phoneNumber: { type: String, required: false, trim: true },
  // Array of neighborhood IDs or names
  neighbourhoods: [{ type: Types.ObjectId, ref: 'Neighbourhood' }],
  outages: [{ type: Types.ObjectId, ref: 'Outage' }],
  // notificationPreferences: notificationPreferencesSchema
  password: {
    type: String, required: true, minlength: 6, validate: {
      validator: function (value) {
        // Alphanumeric validation
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: 'Password must be alphanumeric.'
    }
  },
  // confirmPassword: { type: String, required: true, minlength: 6 },
  // For password reset functionality
  resetPassword: { type: String, set: encrypt, get: decrypt, trim: true },
  // Expiry date for the reset Password
  resetPasswordExpiry: { type: Date }
}, {
  timestamps: true
});





// Apply the toJSON plugin
userSchema.plugin(toJSON)


export const UserModel = model("User", userSchema);
 
// export const resetTokenModel = model('resetToken', resetTokenSchema)
