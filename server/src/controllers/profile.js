const User = require('../models/user.js');

const getProfile = async(req, res, next) => {
    const email = req.params.email;
    // console.log(email);
    const user = await User.findOne({ email: email });
    // const userProfile = req.body;

    if (!user) {
        return res.json({ ok: false, message: "User does not exist." });
    }


    const userDetails = {
        // token: recievedToken,
        photo: user.photo,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        department: user.department,
        batch: user.batch,
    }; 

    return res.status(200).json({ ok: true, message: "User Profile fetched successfully", resUser: userDetails });
};

const updateProfile = async(req, res, next) => {
    // console.log("AUTH : ", req.body);

    try {
        const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, {
        ...req.body 
        }, { new: true });

        console.log("UPDATED USER: ", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ ok: false, message: "User does not exist." });
        }

        // const { _id, ...resUser } = updatedUser; 

        const userDetails = {
            // token: recievedToken,
            photo: updatedUser.photo,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            address: updatedUser.address,
            department: updatedUser.department,
            batch: updatedUser.batch,
        }; 

        return res.status(200).json({ ok: true, message: "User Profile updated successfully", resUser: userDetails });
    } catch (err) {
        return res.status(500).json({ ok: false, message: "Server Error" });
    }
};

module.exports = { getProfile, updateProfile };