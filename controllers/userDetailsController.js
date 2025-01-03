// controllers/userDetailsController.js
import User from "../models/user.model.js";
import UserDetails from "../models/UserDetails.js";
import CreditCard from "../models/creditCard.Model.js";
import { v2 as cloudinary } from "cloudinary";

export const saveUserDetails = async (req, res) => {
  try {
    const {
      fullName,
      fatherName,
      dateOfBirth,
      pinCode,
      address,
      aadharNumber,
      panNumber,
      gender,
      employmentType,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !fatherName ||
      !dateOfBirth ||
      !pinCode ||
      !address ||
      !aadharNumber ||
      !panNumber ||
      !gender ||
      !employmentType) {
      return res.status(400).json({ error: "All fields are required." });
    }

       // Process uploaded files
       const fileUrls = {};
       if (req.files) {
         for (const [fileKey, fileArray] of Object.entries(req.files)) {
           const file = fileArray[0]; // Multer stores files in an array
           console.log(`Uploading ${fileKey}:`, file.path); // Debugging log
           const result = await cloudinary.uploader.upload(file.path, {
             folder: "user_details",
           });
           fileUrls[fileKey] = result.secure_url;
         }
       }
   
   

   
    const newUserDetails = new UserDetails({
      fullName,
      fatherName,
      dateOfBirth,
      pinCode,
      address,
      aadharNumber,
      panNumber,
      gender,
      employmentType,
      selfiePhoto: fileUrls.selfiePhoto || null,
      aadharFrontPhoto: fileUrls.aadharFrontPhoto || null,
      aadharBackPhoto: fileUrls.aadharBackPhoto || null,
      panCardPhoto: fileUrls.panCardPhoto || null,
    });

    await newUserDetails.save();
    res.status(201).json({
      message: "User details saved successfully",
      userDetails: newUserDetails,
    });
  } catch (error) {
    console.error("Error saving user details:", error.message);
    res.status(500).json({
      error: "Failed to save user details",
      details: error.message,
    });
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
