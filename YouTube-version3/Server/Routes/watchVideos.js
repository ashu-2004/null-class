// import express from "express";
// import User from "../Models/Auth.js";  // Updated to use import
// const router = express.Router();

// router.get('/watched/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     res.status(200).json(user.watchedVideos);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching watched videos", error });
//   }
// });

// router.get('/points/:userId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     res.status(200).json({ points: user.points });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching points", error });
//   }
// });

// router.post('/updatePoints', async (req, res) => {
//   const { userId, points } = req.body;
//   try {
//     const user = await User.findById(userId);
//     user.points += points;
//     await user.save();
//     res.status(200).json({ success: true, points: user.points });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating points", error });
//   }
// });

// // app.post('/watchVideos/markWatched', async (req, res) => {
// //   const { userId, videoId } = req.body;

// //   if (!userId || !videoId) {
// //     return res.status(400).json({ message: "Missing parameters: userId or videoId" });
// //   }

// //   try {
// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Mark video as watched by user
// //     if (!user.watchedVideos.includes(videoId)) {
// //       user.watchedVideos.push(videoId);
// //       await user.save();
// //     }

// //     res.status(200).json({ message: "Video marked as watched successfully" });
// //   } catch (error) {
// //     console.error("Error marking video as watched:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // app.post('/updatePoints', async (req, res) => {
// //   const { userId, points } = req.body;

// //   if (!userId || !points) {
// //     return res.status(400).json({ message: "Missing parameters: userId or points" });
// //   }

// //   try {
// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     user.points += points;  // Add the points to the user's total
// //     await user.save();

// //     res.status(200).json({ points: user.points });
// //   } catch (error) {
// //     console.error("Error updating points:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

  

// // Export the router as a module
// export default router;
