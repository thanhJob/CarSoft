import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./index";
import { Logger } from "./src/errorHandle/ultis";

const dataURL = process.env.DATABASE;

// CONNECT DB
if (!dataURL) {
  console.log("Can not found DB!");
} else {
  mongoose
    .connect(dataURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((db) => Logger.info("Connect mongoDB successfully!"))
    .catch((err) => Logger.info(err));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.info(`App listen running on port: ${port}`);
});
