import express from 'express';
import User from '../models/user.model.js';
import UserDetails from '../models/UserDetails.js';
import AdminDashboard from '../models/adminDashboard.model.js';

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
      name: user.name || 'N/A',
      email: user.email || 'N/A',
      phone: user.phone || 'N/A',
      applyFor: user.applyFor || 'N/A',
      income: user.income || 'N/A',
      password: user.password || 'N/A', // Mask password
    }));

    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
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
      fullName:detail.fullName || null,
      fatherName: detail.fatherName || null,
      fatherName: detail.fatherName || null,
      dateOfBirth: detail.dateOfBirth || 'N/A',
      employmentType: detail.employmentType || 'N/A',
      gender: detail.gender || 'N/A',
      address: detail.address || 'N/A',
      aadharNumber: detail.aadharNumber || 'N/A',
      panNumber: detail.panNumber || 'N/A',
      creditCard: detail.creditCard || 'N/A',
    }));

    res.status(200).json({ userDetails: formattedDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details.' });
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
