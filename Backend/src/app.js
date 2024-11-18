const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");

const User = require("./Models/user");

// app.use(
//   cors({
//     origin: "https://broomees-ji3x.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "*",
  })
);

// {
//   origin: (origin, callback) => {
//     if (origin && origin.includes("broomees")) {
//       callback(null, true); // Allow this origin
//     } else {
//       callback(new Error("Not allowed by CORS")); // Reject others
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true, // Enable if using cookies or Authorization headers
// }

// app.use((req, res, next) => {
//   console.log(`CORS Debug: ${req.method} ${req.path}`);
//   console.log("Headers Sent:", res.getHeaders());
//   next();
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(express.json());

const bcrypt = require("bcrypt");

const validator = require("validator");

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/api/signup", async (req, res) => {
  try {
    // console.log(req.body);
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
    res.status(500).json({ message: "Something went wrong" });
  }
});

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
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting database: " + err);
  });
