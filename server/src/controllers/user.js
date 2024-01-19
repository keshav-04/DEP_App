const generateToken = require('../utils/generateToken.js');
const User = require('../models/user.js');
const registerController = async (req, res) => {
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
        batch: ""
      };
  
      console.log(user);
  
      return res.status(200).json({ message: "User created successfully", user });
    } catch (err) {
      // console.log(err);
      return res.json({ status: "false", error: err.message });
    }
  }

const loginController = async(req, res) => {
    const {email} = req.body;
    if(!email)
    {
        return res.json({status: "false",  error: "Email is required" });
    }

    const user = await User.findOne({email});
    if(!user)
    {
        return res.json({status: "false",  error: "User does not exist" });
    }

    // const token = generateToken(user._id);
    
    const userDetails = {
        // token,
        photo: user.photo,
        name: user.name,
        email: user.email,
        phoneNumberNumber: user.phoneNumberNumber,
        address: user.address,
        department: user.department,
        batch: user.batch
    };

    return res.status(200).json({message: 'User logged in successfully', user: userDetails });
};

module.exports = {loginController, registerController};
