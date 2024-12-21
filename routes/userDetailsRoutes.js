import express from "express";
import {
  saveUserDetails,
  getAllUserDetails,
  createCard,
} from "../controllers/userDetailsController.js";


const router = express.Router();

// Route to save user details
router.post("/save", saveUserDetails);

// Route to get all user details
router.get("/all", getAllUserDetails);

router.post("/card/create",  createCard);

export default router;
