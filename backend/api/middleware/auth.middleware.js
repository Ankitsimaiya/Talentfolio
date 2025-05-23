import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET ;

/**
 * Middleware to authenticate users via JWT
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded// { id, role, etc. }
    
    next();
  } catch (err) {
    console.log("error",err)
    res.status(401).json({ success: false,error:err, message: "Invalid or expired token." });
  }
};

/**
 * Middleware for role-based access control
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
