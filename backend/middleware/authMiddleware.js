import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Middleware to protect routes (Authenticated users only)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                res.status(401);
                throw new Error("User not found");
            }
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }
});

// Middleware to allow only organizers
const organizerOnly = (req, res, next) => {
    if (req.user && req.user.role === "organizer") {
        next();
    } else {
        res.status(403);
        throw new Error("Access denied: Organizers only");
    }
};

// Middleware to allow only admins
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403);
        throw new Error("Access denied: Admins only");
    }
};

export { protect, organizerOnly, adminOnly };
