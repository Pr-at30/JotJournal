const express = require("express");
const { loginUser, registerUser, logoutUser } = require("../controllers/auth");


const router = express.Router();

// Login user
router.post("/login", loginUser);

// Register user
router.post("/register", registerUser);

// Logout user
router.get("/logout", logoutUser);

module.exports = router;