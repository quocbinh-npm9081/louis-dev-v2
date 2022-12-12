import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please add your name !'],
      trim: true,
      maxLength: [20, 'your name is up to 20 chars long.'],
    },
    account: {
      type: String,
      required: [true, 'Please add your email !'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add your password !'],
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-1810626-1536314.png',
    },
    type: {
      type: String,
      default: 'normal', // fast
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model('User', userSchema);
