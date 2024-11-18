const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");

const User = require("./Models/user");
const bcrypt = require("bcrypt");

const validator = require("validator");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// POST - SIGNUP API
app.post("/api/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, userName, password } = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    } else if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not Strong" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      userName,
      password: passwordHash,
    });

    await user.save();
    res.json({ message: "User added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong", err: err.message });
  }
});

// POST - LOGIN API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received data:", { email, password });

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Logged in successfully!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// POST - LOGOUT API
app.post("/api/logout", (req, res) => {
  try {
    console.log("User logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Error during logout:", err.message);
    res.status(500).json({ message: "Something went wrong during logout" });
  }
});

// GET - USERS API
app.get("/api/user", async (req, res) => {
  try {
    console.log("Fetching Users...");
    const users = await User.find({});

    if (users.length === 0) {
      console.log(err.message);
      res.status(404).json({ message: "No User found" });
    } else {
      res.json(users);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Something went wrong" });
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Error connecting database: " + err);
  });
