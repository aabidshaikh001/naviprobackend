import User from '../models/user.model.js';
import UserDetails from '../models/UserDetails.js';
import AdminDashboard from '../models/adminDashboard.model.js';

// Fetch all user details
export const fetchAllUsers = async (req, res) => {
    try {
      const [users, userDetails] = await Promise.all([
        User.find().populate('creditCard').lean(),
        UserDetails.find().lean(),
      ]);
  
      const combinedData = users.map(user => {
        const details = userDetails.find(
          detail => detail._id.toString() === user._id.toString()
        );
        return {
          name: user.name,
          email: user.email,
          phone: user.phone,
          applyFor: user.applyFor,
          dateOfBirth: details?.dateOfBirth || null,
          employmentType: details?.employmentType || null,
          gender: details?.gender || null,
          pinCode: details?.pinCode || null,
          address: details?.address || null,
          aadharNumber: details?.aadharNumber || null,
          panNumber: details?.panNumber || null,
        };
      });
  
      res.status(200).json({ users: combinedData });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user details', details: error.message });
    }
  };

// Admin login without password hashing
export const adminLogin = async (req, res) => {
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
};
