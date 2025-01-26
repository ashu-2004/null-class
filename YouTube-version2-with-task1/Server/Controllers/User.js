import User from "../Models/Auth.js";

export const updatePoints = async (req, res) => {
  const { userId, points } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.points += points; 
      await user.save(); 
      return res.status(200).json({ success: true, points: user.points });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ success: true, points: user.points });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
