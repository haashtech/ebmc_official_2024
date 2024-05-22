import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import connectToDb from "./Database/connectToDb.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//for production below

// app.use(
//   cors({
//     origin: 'https://ebmc.ae',
//     credentials: true,
//   })
// );

// Routes

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log("\x1b[1;31;47m%s\x1b[0m", `server started on port:${port}`)
);

connectToDb();
