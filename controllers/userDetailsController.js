// controllers/userDetailsController.js
import User from "../models/user.model.js";
import UserDetails from "../models/UserDetails.js";
import CreditCard from "../models/creditCard.Model.js";

export const saveUserDetails = async (req, res) => {
  try {
    const { fullName, fatherName, dateOfBirth, pinCode, address, aadharNumber, panNumber } = req.body;

    // Validate required fields
    if (!fullName || !fatherName || !dateOfBirth || !pinCode || !address || !aadharNumber || !panNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }

   

    const newUserDetails = new UserDetails({
      fullName,
      fatherName,
      dateOfBirth,
      pinCode,
      address,
      aadharNumber,
      panNumber,
    });

    await newUserDetails.save();
    res.status(201).json({ message: "User details saved successfully" });
  } catch (error) {
    console.error("Error saving user details:", error.message);
    res
      .status(500)
      .json({ error: "Failed to save user details", details: error.message });
  }
};


export const getAllUserDetails = async (req, res) => {
  try {
    const allDetails = await UserDetails.find();
    res.status(200).json(allDetails);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve user details",
      details: error.message,
    });
  }
};

export const createCard = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  if (
    !req.body.cardNumber ||
    !req.body.cvv ||
    !req.body.expDate ||
    !req.body.holderName
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const { cardNumber, cvv, expDate, holderName } = req.body;
      const newCard = new CreditCard({
      cardNumber: cardNumber,
      expiryDate: expDate,
      cvv: cvv,
      holderName: holderName,
    });
    await newCard.save();
    await User.findByIdAndUpdate(userId, { creditCard: newCard._id });
    res
      .status(201)
      .json({ message: "Card created successfully.", card: newCard });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating new card.", error: err.message });
  }
};
