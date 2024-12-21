import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  pinCode: { type: String, required: true },
  address: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("UserDetails", userDetailsSchema);
