import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoroutes from "./Routes/video.js";
import userroutes from "./Routes/User.js";
import path from "path";
import commentroutes from "./Routes/comment.js";
import updatePoints from "./Routes/updatePoints.js";
dotenv.config();
const app = express();

const router = express.Router();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));

app.get("/", (req, res) => {
  res.send("Your tube is working");
});

app.use(bodyParser.json());
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/comment", commentroutes);
app.use("/updatePoints", updatePoints);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
const DB_URL = process.env.DB_URL;
// const DB_URL="mongodb+srv://admin:admin@your-tube.t8uz7.mongodb.net/?retryWrites=true&w=majority&appName=Your-tube"
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Mongodb Database connected");
  })
  .catch((error) => {
    console.log("Database is not connected.", error);
  });
