// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { default: connectDB } = require("./db");
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

app.get("/", (req, res) => {
  res.send("EVERYTHING IS OK");
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed: ", err);
  });
