import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  mobilenumber: String,
  email: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
