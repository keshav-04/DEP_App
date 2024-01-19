module.exports.generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now();
    return { otp, timestamp };
  };