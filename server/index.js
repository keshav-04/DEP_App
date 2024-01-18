require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected Established!!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //checking for errors
db.once("open", () => {
  console.log("Database connected"); //successfully connected
});
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());

// const generateToken = require('./src/utils/generateToken.js');

//models
const User = require("./src/models/user.js");

//routes
const profileRoutes = require('./src/routes/profileRoute.js');

//profile Routes
app.use("/profile", profileRoutes);

const transporter = nodemailer.createTransport({
  // host: 'smtp-mail.outlook.com',
  // port: 587,
  // secure: false,
  // auth: {
  //   user: 'dep2024.p06@outlook.com',
  //   pass: 'dep_p06_2024',
  // },
  // tls: {
  //   ciphers: 'SSLv3',
  // },

  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "2021csb1076@iitrpr.ac.in",
    pass: "SYDqKvC5gnG4dRmb",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const timestamp = Date.now();
  return { otp, timestamp };
};
const otpMap = new Map();

//sendotp
app.post("/sendotp", (req, res) => {
  console.log("A");
  const email = req.body.email;
  if (!email) {
    return res.json({ status: "false", error: "Email is required" });
  }
   else if (!/^[a-zA-Z0-9._-]+@iitrpr\.ac\.in$/.test(email)) {
    return res.json({status:"false", error: "('Error', 'Invalid email address or not from iitrpr.ac.in domain!'"});
  }

  const { otp, timestamp } = generateOtp();
  otpMap.set(email, { otp, timestamp });
  const mailOptions = {
    from: "dep2024.p06@gmail.com",
    to: email,
    subject: "Signup - DEP_App",
    text: `Hi!\nWelcome to the App.\nYour OTP is: ${otp}. Please use this OTP to verify your email address. The OTP is valid for 10 minutes.\n\nRegards,\nDEP_P06_2024`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ status: "false", error: error.message });
    }
    console.log("Email sent to %s: %s", email, info.response);
    return res.json({ status: "true", message: "OTP sent successfully" });
  });
});

app.post("/verifyotp", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  if (!email || !otp) {
    return res.json({ status: "false", error: "Email and OTP are required" });
  }
  const storedData = otpMap.get(email);
  console.log(storedData);
  if (!storedData || storedData.otp !== otp) {
    return res.json({ status: "false", error: "Invalid OTP" });
  }
  otpMap.delete(email);
  const timeDifference = Date.now() - storedData.timestamp;
  const otpExpiryTime = 10 * 60 * 1000;
  console.log(timeDifference, otpExpiryTime);
  if (timeDifference > otpExpiryTime) {
    return res.json({ status: "false", error: "OTP expired" });
  }

  return res.json({ message: "OTP verified successfully" });
});

app.post("/createuser", async (req, res) => {
  const { name, email, phoneNumber } = req.body;
//   console.log
  if (!name || !email || !phoneNumber) {
    return res.json({ status: "false", error: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      status: "false",
      error: "Email already exists.\nLogin Instead.",
    });
  }

  //token = "" is removed for now
  try {
    let newUser = new User({
      name,
      email,
      photo: "",
      phoneNumber,
      address: "",
      department: "",
      batch: "",
    });
    await newUser.save();

    // const token = generateToken(newUser._id);

    const user = {
      photo: "",
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      address: "",
      department: "",
      batch: "", //CHECK should be null/ any initial date
    };

    console.log(user);

    return res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    // console.log(err);
    return res.json({ status: "false", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
