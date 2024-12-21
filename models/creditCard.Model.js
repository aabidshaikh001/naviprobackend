import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema(
  {
    User: { type: mongoose.Schema.Types.ObjectId, required: true },
    holderName: { type: String, required: true, unique: true },
    cardNumber: { type: String, required: true, unique: true },
    expiryDate: { type: String, default: "11/27", required: true },
    cvv: { type: String, required: true },
  },
  { timestamps: true }
);

const CreditCard = mongoose.model("CreditCard", creditCardSchema);
export default CreditCard;
