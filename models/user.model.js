import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // basic regex validation for emails
    password: { type: String, required: true }
});

//mongoose middleware to bcrypt password

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);  //generate salt rounds
        this.password = await bcrypt.hash(this.password, salt); //hash the password
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

  //Method to verify plain and encrypted password 
  userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//model
const User = mongoose.model('users', userSchema);

export default User;
