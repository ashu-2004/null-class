import express from "express";
import { updatePoints, getUserPoints } from "../Controllers/User.js";

const router = express.Router();

router.post("/",updatePoints); 
router.get("/getUserPoints/:userId", getUserPoints);

export default router;