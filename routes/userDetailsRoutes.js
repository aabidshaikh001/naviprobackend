import express from "express";
import {
  saveUserDetails,
  getAllUserDetails,
  createCard,
} from "../controllers/userDetailsController.js";
import upload from "../middleware/fileUpload.js";


const router = express.Router();

router.post(
  "/save",
  upload.fields([
    { name: "selfiePhoto", maxCount: 1 },
    { name: "aadharFrontPhoto", maxCount: 1 },
    { name: "aadharBackPhoto", maxCount: 1 },
    { name: "panCardPhoto", maxCount: 1 },
  ]),
  saveUserDetails
);


// Route to get all user details
router.get("/all", getAllUserDetails);

router.post("/card/create",  createCard);

export default router;
