const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user_model");
const bcrypt = require("bcrypt")
 
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
 
// Helper: sign a JWT for a given user
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
 
// @route  POST /api/auth/signup
// @desc   Register a new user with email + password
const signup = async (req, res) => {
  try {
    console.log("1. Request received");

    const { firstName, lastName, email, password } = req.body;
    console.log("2. Credential received");

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    console.log("no error in payload")

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    console.log("user found")
    
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      authProvider: "local",
    });
    console.log("user created")
 
    const token = signToken(user);
    console.log("token created")
 
    res.status(201).json({
      message: "Signup successful",
      token,
      user,
    });

  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Server error during signup" });
  }
};
 
// @route  POST /api/auth/login
// @desc   Login with email + password
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
 
    // explicitly select password since schema doesn't force it in queries
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
 
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
 
    if (user.authProvider === "google" && !user.password) {
      return res.status(400).json({
        message: "This account was created with Google. Please sign in with Google instead.",
      });
    }
 
    // const isMatch = await user.comparePassword(password);

    const isMatch = await bcrypt.compare(password,user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
 
    const token = signToken(user);
 
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};
 
// @route  POST /api/auth/google
// @desc   Login/Signup using a Google ID token obtained on the frontend
//         via Google Identity Services (google.accounts.id)
const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body; // ID token string from the frontend
 
    if (!credential) {
        return res.status(400).json({ 
            success: false,
            message: "Missing Google credential" 
        });
    }
 
    // Verify the token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
 
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture, email_verified } = payload;
    const names = name.split(" ");
 
    // Find existing user by googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email: email.toLowerCase() }] });
 
    if (user) {
      // If they previously signed up locally with the same email, link the account
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        if (!user.profilePicture) user.profilePicture = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        firstName: names[0],
        lastName: names.slice(1).join(" "),
        email,
        password: null,
        authProvider: "google",
        googleId,
        verified: email_verified,
        profilePicture: picture
      });
    }
 
    const token = signToken(user);

    res.status(200).json({
      message: "Google authentication successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(401).json({ message: "Invalid or expired Google credential" });
  }
};
 
// @route  GET /api/auth/me
// @desc   Get currently logged-in user (requires auth middleware)
/*const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error("GetMe error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};*/
 
module.exports = { signup, login, googleAuth };