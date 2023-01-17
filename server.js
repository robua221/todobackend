const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");

let tasks = require("./routes/tasks/");
let users = require("./routes/users/");

app.use(cors());
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_ATLAS_URL)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("unable to connect", err.message, err);
  });

app.use("/images", express.static(path.join("images")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.set("port", port);

app.use("/api/tasks/", tasks);
app.use("/api/users/", users);

const server = http.createServer(app);

server.on("error", (err) => {
  console.log("error in server ", err.message, err);
});

server.on("listening", () => {
  console.log(" listening on port: ", port);
});

server.listen(port);
