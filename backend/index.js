import express, { json } from "express";
const app = express();

import userRoutes from "./routes/User.js";
import profileRoutes from "./routes/Profile.js";
import paymentRoutes from "./routes/Payments.js";
import courseRoutes from "./routes/Course.js";

import { connect } from "./config/database.js";
import cookieParser from "cookie-parser";
// const core = require("core");
import { cloudinaryConnect } from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
import { createTransport } from "nodemailer";
config();
const PORT = process.env.PORT || 4000;
connect();

//middleware
app.use(json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     Credential: true,
//   })
// );
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
//cloudinary connection
cloudinaryConnect();

//routes'
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and ruining...!!!!",
  });
});
app.listen(PORT, () => {
  console.log(`App is ruing at ${PORT}`);
});
