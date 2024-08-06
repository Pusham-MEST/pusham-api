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
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }

      // Array of neighborhood IDs or names
  




    
    },{
    timestamps:true
  });
//reset token model 
const resetTokenSchema = new Schema({
  userId:{type:Types.ObjectId,required:true, ref:'User'},
  expired:{type:Boolean, default:false},
  expiredAt:{
      type:Date,
      default:() => new Date().setHours(new Date().getHours() + 2)
  }

},{
  timestamps:true
})

 
  // Apply the toJSON plugin
  userSchema.plugin(toJSON)
  resetTokenSchema.plugin(toJSON)

  export const resetTokenModel= model('resetToken',resetTokenSchema)
    export const UserModel = model('User', userSchema);
    