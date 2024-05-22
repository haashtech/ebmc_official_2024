import jwt from "jsonwebtoken";

import adminModel from "../model/adminModel.js";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;

    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);

    const user = await adminModel.findById(decoded.sub);

    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
} catch (error) {
    console.error(error);
    return res.sendStatus(401);
}
};

export default requireAuth;
