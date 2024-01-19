require("dotenv").config();
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



//importing routes
const profileRoutes = require("./src/routes/profileRoute.js");
const userRoutes = require("./src/routes/userRoute.js");
const otpRoutes = require("./src/routes/otpRoute.js");

//otp Routes
app.use("/", otpRoutes);
//user Routes
app.use("/", userRoutes);
//profile Routes
app.use("/profile", profileRoutes);


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
