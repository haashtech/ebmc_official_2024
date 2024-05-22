import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import notificationModel from "../model/notificationModel.js";
import newsModel from "../model/newsModel.js";
import careerModel from "../model/careerModel.js";
import ApiHistory from "../model/apihistoryModel.js";
import individualWebhookModel from "../model/individualWebhookModel.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.sendStatus(401);
    }

    if (user.password !== password) {
      return res.sendStatus(401);
    }

    if (user.isBlocked === true) {
      return res.status(403).json({ error: "User is blocked" });
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.USER_SECRET_KEY);

    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      user: {
        companyName: user.companyName,
        street: user.street,
        city: user.city,
        zipCode: user.zipCode,
        country: user.country,
        emirate: user.emirate,
        trn: user.trn,
        email: user.email,
        checkLimit: user.checkLimit,
        apiUsage: user.apiUsage,
      },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
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

const checkAuth = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
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

    const notification = await notificationModel.findOne({
      _id: notificationId,
    });
    res.json({ notification });
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
    const newsId = req.params.Id;
    const news = await newsModel.findOne({ _id: newsId });
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json({ news });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewCareers = async (req, res) => {
  try {
    const career = await careerModel.find();
    const careerCount = await careerModel.countDocuments();
    res.json({ career, careerCount });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const viewCareer = async (req, res) => {
  try {
    const careerId = req.params.Id;

    const career = await careerModel.findOne({ _id: careerId });

    if (!career) {
      return res.status(404).json({ error: "career not found" });
    }
    res.json({ career });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
const viewIndividualresult = async (req, res) => {
  try {
    const apiKey = process.env.ZIGNSEC_API_KEY;
    const apiUrl =
      "https://gateway.zignsec.com/core/api/sessions/identity_check/pep_global_member_check";

    const queryData = req.body;

    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    const response = await axios.post(apiUrl, queryData, {
      headers,
    });
    const historyEntry = new ApiHistory({
      user: req.user._id,
      query: JSON.stringify(queryData),
      response: response.data, // Save response as a string
      type: "individual",
    });

    await historyEntry.save();

    console.log("Individual - History Entry", historyEntry);

    res.json(response.data);
  } catch (err) {
    console.log(err);
    console.error("Error:", err.response ? err.response.data : err.message);
    res.status(500).json({ err: "Internal server Error" });
  }
};

const individualWebhook = async (req, res) => {
  try {
    const webhookPayLoad = new individualWebhookModel({
      payload: req.body,
    });
    await webhookPayLoad.save();

    console.log("Webhook payload saved", webhookPayLoad);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error in saving webhook payload", error);
    res.sendStatus(500);
  }
};

const viewCompanyresult = async (req, res) => {
  try {
    const apiKey = process.env.ZIGNSEC_API_KEY;
    const apiUrl =
      "https://gateway.zignsec.com/core/api/sessions/company_check/pep_global_member_check";

    const queryData = req.body;

    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };
    const response = await axios.post(apiUrl, queryData, {
      headers,
    });

    const historyEntry = new ApiHistory({
      user: req.user._id,
      query: JSON.stringify(queryData),
      response: response.data,
      type: "company",
    });

    await historyEntry.save();

    console.log("corporate- history Entry", historyEntry);

    res.json(response.data);
  } catch (err) {
    console.log(err);
    console.error("Error:", err.response ? err.response.data : err.message);
    res.status(500).json({ err: "Internal server Error" });
  }
};

const viewApiusage = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    const apiUsage = user.apiUsage;
    const apilimit = user.checkLimit;

    res.json({ apiUsage, apilimit });
  } catch (error) {
    console.error("Error fetching api usagedata", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
















const viewSearchhistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await ApiHistory.find({ user: userId }).sort({
      createdAt: -1,
    });

    history.forEach((entry) => {
      console.log(`Type for entry ${entry._id}: ${getType(entry)}`);
    });

    const formattedHistory = history.map((entry) => ({
      ...entry.toObject(),
      type: getType(entry),
    }));

    res.json(formattedHistory);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function getType(entry) {
  console.log("Entry:", entry);

  const queryData = JSON.parse(entry.query);

  if (queryData.metadata && queryData.metadata.company_name) {
    return "corporate";
  } else {
    return "individual";
  }
}

const viewDetailhistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const historyId = req.params.id;

    const detailedHistory = await ApiHistory.findOne({
      _id: historyId,
      user: userId,
    });

    if (!detailedHistory) {
      return res
        .status(404)
        .json({ error: "Detailed history entry not found" });
    }

    res.json(detailedHistory);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  login,
  logout,
  checkAuth,
  viewNotifications,
  viewNotification,
  viewNewses,
  viewNews,
  viewCareers,
  viewCareer,
  viewIndividualresult,
  viewCompanyresult,
  viewSearchhistory,
  viewDetailhistory,
  individualWebhook,
  viewApiusage,
};
