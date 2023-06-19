const express = require("express");
const { loginUser, registerUser, logoutUser, profile } = require("../controllers/auth");


const router = express.Router();

// Login user
router.post("/login", loginUser);

// Register user
router.post("/register", registerUser);

// Logout user
router.get("/logout", logoutUser);

// Profile
router.get("/profile", profile);


module.exports = router;