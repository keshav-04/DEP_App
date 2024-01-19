const {generateOtp} = require("../utils/generateOtp");
const otpMap = new Map();   //use database instead of map
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

//sendotp
const sendotpController = (req, res) => {
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
  };

  
  
const verifyotpController = async (req, res) => {
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
  };

  module.exports = { sendotpController, verifyotpController };