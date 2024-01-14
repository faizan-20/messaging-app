import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/index.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed: ", err);
  });
