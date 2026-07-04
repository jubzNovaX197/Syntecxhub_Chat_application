import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: currentUserId },
    }).select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};