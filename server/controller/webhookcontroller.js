import crypto from "crypto";
// import sessionModel from "../model/sessionModel.js";
import ApiHistory from "../model/apihistoryModel.js";

const handleWebhook = (req, res) => {
  const header = req.headers["x-zignsec-hmac-sha256"];

  console.log("header", header);

  if (!header) {
    return res.status(400).send("No signature header found");
  }

  const elements = header.split(",");
  const signatureObj = {}; 

  elements.forEach((element) => {
    const [key, value] = element.split("=");

    signatureObj[key.trim()] = value.trim();
  });

  const timestamp = signatureObj.t;
  const signature = signatureObj.v1;

  const payload_string = `${timestamp}.${JSON.stringify(req.body)}`;

  const secretKey = process.env.WEBHOOK_SECRET_KEY ;

  console.log("payload string", payload_string);

  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(payload_string)
    .digest("hex");

  console.log("Computed Digest", hmac);

  const computedDigest = hmac.toLowerCase();

  console.log("received Signature", signature);

  if (computedDigest !== signature) {
    return res.status(401).send("Invalid signature");
  }

  const {
    event,
    result: { eventSpecificData },
  } = req.body;

  if (event === "Session_Created") {
    const { sessionId, updatedData } = eventSpecificData;

    updateSessionInDatabase(sessionId, updatedData);

    sendUpdateSessionToFrontend(sessionId, updatedData);
  }

  res.status(200).send("Webhook received and processed successfully");
};

const updateSessionInDatabase = (sessionId, response) => {
  console.log(`Updating session ${sessionId} with data `, response);
  const session = new ApiHistory ({ sessionId, response});
  session
    .save()
    .then(() => console.log("SessionData is saved to MongoDB"))
    .catch((error) =>
      console.error("Error saving session data to database", error)
    );
};

const sendUpdateSessionToFrontend = (sessionId, response) => {
  console.log(
    `Sending updated session ${sessionId} to frontend with data`,
    response
  );
};

const getWebhookData = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    console.log("sessionId is",sessionId);
    
    const Sessions = await ApiHistory.findOne({ sessionId });

    if (!Sessions) {
      return res.status(404).json({ error: "Sessions not found" });
    }
    res.json(Sessions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default {
  handleWebhook,
  getWebhookData,
};
