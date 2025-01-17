import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    applyFor: { type: String, enum: ["Credit Card"], required: true },
    income: { type: Number, required: true },
        creditCard: { type: mongoose.Schema.ObjectId,ref: "CreditCard" },
    password: { type: String, required: true },
   
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
