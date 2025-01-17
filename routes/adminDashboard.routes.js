import express from 'express';
import User from '../models/user.model.js';
import UserDetails from '../models/UserDetails.js';
import AdminDashboard from '../models/adminDashboard.model.js';
import mongoose from 'mongoose';


const router = express.Router();

/**
 * @route GET /admin/users
 * @desc Fetch all users
 * @access Private
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean(); // Fetch users

    const formattedUsers = users.map((user) => ({
       _id: user._id,  // Include the user ID
      name: user.name || 'N/A',
      email: user.email || 'N/A',
      phone: user.phone || 'N/A',
      applyFor: user.applyFor || 'N/A',
      income: user.income || 'N/A',
      password: user.password || 'N/A', // Mask password
      createdAt: user.createdAt || 'N/A', // Include createdAt
      updatedAt: user.updatedAt || 'N/A', // Include updatedAt
    }));

    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Validate if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

/**
 * @route GET /admin/userDetails
 * @desc Fetch all user details
 * @access Private
 */
router.get('/userDetails', async (req, res) => {
  try {
    const userDetails = await UserDetails.find().lean(); // Fetch user details

    const formattedDetails = userDetails.map((detail) => ({
      id: detail._id, // Include the unique ID for deletion
      fullName: detail.fullName || null,
      fatherName: detail.fatherName || null,
      dateOfBirth: detail.dateOfBirth || 'N/A',
      employmentType: detail.employmentType || 'N/A',
      gender: detail.gender || 'N/A',
      address: detail.address || 'N/A',
      aadharNumber: detail.aadharNumber || 'N/A',
      panNumber: detail.panNumber || 'N/A',
      creditCard: detail.creditCard || 'N/A',
      selfiePhoto: detail.selfiePhoto || null,
aadharFrontPhoto: detail.aadharFrontPhoto || null,
aadharBackPhoto: detail.aadharBackPhoto || null,
panCardPhoto: detail.panCardPhoto || null,
createdAt: detail.createdAt || 'N/A', // Include createdAt
updatedAt: detail.updatedAt || 'N/A', // Include updatedAt
    }));

    res.status(200).json({ userDetails: formattedDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details.' });
  }
});

/**
 * @route DELETE /admin/userDetails/:id
 * @desc Delete a user's details by ID
 * @access Private
 */
router.delete('/userDetails/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the user details by ID
    const result = await UserDetails.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

/**
 * @route POST /admin/login
 * @desc Admin login without password hashing
 * @access Public
 */
router.post('/login', async (req, res) => {
  const { adminUsername, adminPassword } = req.body;

  // Check if both username and password are provided
  if (!adminUsername || !adminPassword) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find admin by username
    const admin = await AdminDashboard.findOne({ adminUsername });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Compare the provided password with the stored plain text password
    if (admin.adminPassword !== adminPassword) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Respond with admin details (excluding password)
    res.status(200).json({
      message: 'Login successful.',
      admin: {
        id: admin._id,
        username: admin.adminUsername,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
});




export default router;
