import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authentication = async (req, res, next) => {
  const refreshToken = req.cookies.refToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.phone = decoded.phone;
    req.user = await User.findById(req.userId);
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      console.error("Refresh token verification error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authentication;
