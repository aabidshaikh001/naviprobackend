import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, phone, applyFor, income, password } = req.body;

  // Check if all required fields are present
  if (!name || !email || !phone || !applyFor || !income || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone already registered." });
    }

    // Create a new user
    const user = new User({ name, email, phone, applyFor, income, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Registration failed.", error });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ message: "Phone and password are required." });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid phone number or password." });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid phone number or password." });
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("refToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error });
  }
};
