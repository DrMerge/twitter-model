require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 7000;

connectDB();
app.use(express.json());
app.use(express.static("public"));
app.use("/", require(path.join(__dirname, "routes", "indexRoute.js")));
app.use("/register", require(path.join(__dirname, "routes", "register.js")));
app.use("/login", require(path.join(__dirname, "routes", "login.js")));

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

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
