const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const mainRouter = require("./routes/index.routes");

const winston = require("winston");
const expressWinston = require("express-winston");

const PORT = config.get("port") || 3030;

const cookieParser = require("cookie-parser");
const error_handing_middleware = require("./middleware/error_handing_middleware");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const logger = require("./services/logger.service");
const { required } = require("joi");

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get("secret"));

// logger.log("info", "LOG malumotlari");
// logger.error("Error malumotlari");
// logger.debug("DEBUG malumotlari");
// logger.warn("WARN malumotlari");
// logger.info("INFO malumotlari");

// console.trace("TRACE malumotlari");
// console.table([1, 2, 3]);
// console.table([
//   ["Salim", 21],
//   ["Abu", 16],
// ]);

process.on("uncaughtExeption", (exeption) =>
  console.log("uncaughtedExeption: ", exeption.message)
);

process.on("uncaughtRejection", (rejection) =>
  console.log("uncaughtedRejection: ", rejection)
);

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(require("./middleware/logger"));

app.use(require("./middleware/errorLogger"));

app.use("/api", mainRouter);

app.use(error_handing_middleware);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log("Malumotlar bazasiga ulanishda xatolik", error);
  }
}

start();
