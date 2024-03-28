const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const mainRouter = require("./routes/index.routes");
const exHbs = require("express-handlebars");
const viewRouter = require("./routes/view.routes")

const PORT = config.get("port") || 3030;

const cookieParser = require("cookie-parser");
const error_handing_middleware = require("./middleware/error_handing_middleware");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(express.json());

app.use(cookieParser());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);

app.set("View engine", "hbs");
app.set("views", "views");
app.use(express.static("views"));

app.use("/", viewRouter)

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
