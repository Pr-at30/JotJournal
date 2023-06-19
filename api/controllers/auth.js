const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();
    console.log(savedUser);
    res
      .status(201)
      .json({ message: "User registered successfully", savedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User Doesn't Exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { username, id: user._id },
      process.env.JWT_SECRET,
      {}
    );

    res.cookie("token", token,
      {
        Samesite: "None",
        secure: true,
        httpOnly: true,
        expires: new Date(0),
        domain: "localhost.com " || "localhost" || "http://localhost:3000",
      });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

//  Logout user
const logoutUser = async (req, res) => {
  res.cookie("token", "",
    {
      Samesite: "None",
      secure: true,
      httpOnly: true,
      expires: new Date(0),
      domain: "localhost.com " || "localhost" || "http://localhost:3000",
    });
  res.status(200).json({ message: "Logout successful" });
};

// Profile
const profile = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(decoded);
  } catch (error) {
    return res.status(200).json({ message: "Failed to authenticate" });
  }
};


module.exports = { registerUser, loginUser, logoutUser, profile };