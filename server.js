require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorLog");
const verifyJWT = require("./middleware/verifyJWT");

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 7000;

connectDB();
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/", require(path.join(__dirname, "routes", "indexRoute.js")));
app.use("/register", require(path.join(__dirname, "routes", "register.js")));
app.use("/otp", require(path.join(__dirname, "routes", "otp.js")));
app.use("/resend", require(path.join(__dirname, "routes", "resendOTP.js")));
app.use("/auth", require(path.join(__dirname, "routes", "auth.js")));
app.use("/refresh", require(path.join(__dirname, "routes", "refresh.js")));

app.use("/tweet", require(path.join(__dirname, "routes", "tweet.js")));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log(`socket id : ${socket.id}`);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
