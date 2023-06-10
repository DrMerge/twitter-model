require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorLog");
const verifyJWT = require("./middleware/verifyJWT");
const getUserID = require("./handle/getUserID");
const session = require("express-session");
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
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
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

const connectedSockets = [];

io.on("connection", async (socket) => {
  const { headers } = socket.request;
  const string = headers.cookie.toString();

  const emailMatch = string.match(/email=([^;]+)/);
  const email = emailMatch ? emailMatch[1] : null;
  const decodedEmail = decodeURIComponent(email);
  console.log(decodedEmail);

  try {
    const rawID = await getUserID(decodedEmail);
    socket.id = rawID.toString();
  } catch (err) {
    console.log(err);
    socket.emit("error", "Failed to get user ID"); // Emit custom event for error handling
    return; // Stop further execution if an error occurs
  }

  if (!socket.id) {
    console.log("Failure to connect");
    socket.emit("error", "Failed to connect"); // Emit custom event for error handling
    return; // Stop further execution if the socket ID is empty
  }

  if (!connectedSockets.includes(socket.id)) {
    connectedSockets.push(socket.id);
    console.log(`Socket id : ${socket.id} connected`);
    console.log(connectedSockets.length);
    console.log(connectedSockets);
  } else {
    console.log(`Socket id : ${socket.id} connected`);
    console.log(connectedSockets.length);
    console.log(connectedSockets);
  }

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    const index = connectedSockets.indexOf(socket.id);
    if (index !== -1) {
      connectedSockets.splice(index, 1);
    }
    console.log(`Socket id : ${socket.id} disconnected`);

    // Perform any necessary cleanup or actions here
  });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
