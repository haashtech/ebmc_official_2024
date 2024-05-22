import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;

    if (!token) {
      console.log('No authentication token provided.');
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);

    const user = await userModel.findById(decoded.sub);

    if (!user) {
      console.log('User not found based on the provided token.');
      return res.sendStatus(401);
    }

    if (user.isBlocked === true) {
      console.log(`Access denied for blocked user with ID ${user._id}`);
      return res.status(403).json({ error: "User is blocked" });
    }

    req.user = user;
    // console.log('User authenticated:', req.user);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.error('Token verification failed:', error.message);
      return res.sendStatus(401);
    } else if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error.message);
      return res.status(401).json({ error: 'Token expired' });
    } else {
      console.error('Error during authentication:', error);
      return res.sendStatus(401);
    }
  }
};

export default requireAuth;
