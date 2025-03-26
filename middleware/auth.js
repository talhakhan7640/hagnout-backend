import jwt from "jsonwebtoken";
import userModel from "../models/users/userModel.js";
import path from "path";
import { fileURLToPath } from "url";

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    console.log("⛔ No token provided");
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const authenticateUser = await userModel.findOne({
      username: req.body.username,
    });

    if (authenticateUser) {
      if (authenticateUser._id != user.userId) {
        console.log("⚠️ Warning: Unauthorized Access Attempted!");
        return res
          .status(401)
          .json({ message: "Access Denied: Unauthorized access attempted" });
      }
    }

    //console.log("✅ Token Verified, User:", user);
    req.user = user;
    next();
  });
}

export default authenticateToken;
