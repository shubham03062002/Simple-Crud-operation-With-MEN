import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sirname:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that email is unique
    match: /.+\@.+\..+/ // Simple regex to validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength:10 // Password must be at least 6 characters
  },

}, {
  timestamps: true, // Automatically create createdAt and updatedAt fields
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
