import userModel from "../model/userModel.js";

const checkAPILimit = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("checklimit middleware",userId);

    const user = await userModel.findById(userId);

    if (user.apiUsage >= user.checkLimit) {
      return res.status(429).json({ error: "API limit exceeded" });
    }

    user.apiUsage += 1;
    await user.save();

    next();
  } catch (error) {
    console.error("Error checking API limit", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default checkAPILimit;
