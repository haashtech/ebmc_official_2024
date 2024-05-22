import Jwt from "jsonwebtoken";
import colors from "colors";
import bcrypt from "bcryptjs";
import { mongoose } from "mongoose";
import userModel from "../model/userModel.js";
import newsModel from "../model/newsModel.js";
import notificationModel from "../model/notificationModel.js";
import adminModel from "../model/adminModel.js";
import careerModel from "../model/careerModel.js";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await adminModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Incorrect username or password" }); 
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;  
    const token = Jwt.sign(
      { sub: user._id, exp },
      process.env.ADMIN_SECRET_KEY 
    );

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const checkAuth = (req, res) => {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    console.log(err);
    res.sendStatus(400);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { username, password, newPassword, repeatNewpassword } = req.body;

    const user = await adminModel.findOne({ username });

    if (!user) {
      return res.sendStatus(401);
    }

    const oldPasswordMatch = password === user.password;

    if (!oldPasswordMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    if (newPassword !== repeatNewpassword) {
      return res
        .status(400)
        .json({ error: "New password and repeat new password do not match" });
    }

    if (password === newPassword) {
      return res.status(400).json({
        error: "New password must be different from the old password",
      });
    }
    user.password = newPassword;

    await user.save();

    res.status(200).json({ success: "password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const {
      companyName,
      email,
      country,
      emirate,
      street,
      city,
      zipCode,
      trn,
      checkLimit,
      password,
    } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      companyName,
      email,
      country,
      emirate,
      street,
      city,
      zipCode,
      trn,
      checkLimit,
      password,
    });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);

    res.sendStatus(400);
  }
};

const viewUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ users });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewUser = async (req, res) => {
  try {
    const _id = req.params.Id;

    const user = await userModel.findOne({ _id });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.Id;

    const {
      companyName,
      email,
      country,
      emirate,
      street,
      city,
      zipCode,
      trn,
      checkLimit,
      password,
    } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        companyName,
        email,
        country,
        emirate,
        street,
        city,
        zipCode,
        trn,
        checkLimit,
        password,
      },
      { new: true }
    );

    res.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.Id;

    await userModel.findByIdAndDelete({ _id: userId });
    res.json({ Success: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const blockUser = async (req, res) => {
  try {
    const _id = req.params.Id._id;
    const user = await userModel.findOne(_id);
    console.log("block-", user);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    user.isBlocked = true;

    await user.save();

    return res.json({ success: `${user.firstName} is blocked` });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const unblockUser = async (req, res) => {
  try {
    const _id = req.params.Id._id;
    const user = await userModel.findOne(_id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    user.isBlocked = false;
    await user.save();
    return res.json({ success: `${user.firstName} is unblocked` });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const blockStatus = async (req, res) => {
  try {
    console.log("block status");

    const _id = req.params.Id._id;

    const user = await userModel.findOne(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ isBlocked: user.isBlocked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const viewUsercount = async (req, res) => {
  try {
    const count = await userModel.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addNews = async (req, res) => {
  try {
    const { title, description } = req.body;

    const news = await newsModel.create({
      title,
      description,
    });

    res.json({ news });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewNewses = async (req, res) => {
  try {
    const news = await newsModel.find();
    res.json({ news });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const _id = newsId;
    const news = await newsModel.findOne(_id);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json({ news });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateNews = async (req, res) => {
  try {
    const _id = req.params.id;

    const { title, description } = req.body;
    await newsModel.findOneAndUpdate(
      { _id },
      {
        title,
        description,
      },
      { new: true }
    );
    const news = await newsModel.findById(_id);
    res.json({ news });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;

    await newsModel.findOneAndDelete({ _id: newsId });
    res.json({ Success: "NEWS deleted successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const addNotification = async (req, res) => {
  try {
    const { date, description } = req.body;

    const notification = await notificationModel.create({
      date,
      description,
    });
    res.json({ date, notification });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find();
    res.json({ notifications });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewNotification = async (req, res) => {
  try {
    const notificationId = req.params.Id;

    const _id = notificationId;

    const notification = await notificationModel.findOne({ _id });
    res.json({ notification });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateNotification = async (req, res) => {
  try {
    const notificationId = req.params.Id;

    const _id = notificationId;

    const { description } = req.body;

    await notificationModel.findOneAndUpdate(
      {
        _id,
      },
      { description },
      { new: true }
    );
    const notification = await notificationModel.findById(_id);
    res.json({ notification });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.Id;
    console.log(notificationId);
    await notificationModel.findOneAndDelete({ _id: notificationId });
    res.json({ success: "notification deleted successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const addCareer = async (req, res) => {
  try {
    const { date, title, description } = req.body;
    await careerModel.create({
      date,
      title,
      description,
    });
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

const viewCareers = async (req, res) => {
  try {
    const careers = await careerModel.find();

    res.json({ careers });
  } catch (err) {
    console.log(err.yellow);
    res.sendStatus(400);
  }
};

const viewCareer = async (req, res) => {
  try {
    const careerId = req.params.Id;
    const career = await careerModel.findOne({ _id: careerId });

    if (!career) {
      return res.status(404).json({ error: "career not found " });
    }
    res.json({ career });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
const updateCareer = async (req, res) => {
  try {
    const careerId = req.params.Id;

    const { date, title, description } = req.body;

    await careerModel.findOneAndUpdate(
      { _id: careerId },
      {
        date,
        title,
        description,
      },
      { new: true }
    );
    const career = await careerModel.findById({ _id: careerId });
    res.json({ career });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const deleteCareer = async (req, res) => {
  try {
    const careerId = req.params.Id;
    await careerModel.findByIdAndDelete({ _id: careerId });
    res.json({ success: "career  deleted successfully " });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export default {
  addUser,
  viewUsers,
  viewUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  blockStatus,
  login,
  resetPassword,
  logout,
  checkAuth,
  viewNewses,
  viewNews,
  addNews,
  updateNews,
  deleteNews,
  viewNotifications,
  viewNotification,
  addNotification,
  updateNotification,
  deleteNotification,
  addCareer,
  viewCareers,
  viewCareer,
  updateCareer,
  deleteCareer,
  viewUsercount,
};
