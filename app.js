//app.js
"use strict";
const express = require("express");
const userRoutes = require("./src/user-routes");
const activityRoutes = require("./src/activity-routes");
const reportRoutes = require("./src/report-routes");
const profileRoutes = require("./src/profile-routes");
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is EmoQu Backend");
});

//routes
app.use("/auth", userRoutes.routes);
app.use("/api", activityRoutes.routes);
app.use("/api", reportRoutes.routes);
app.use("/api", profileRoutes.routes);

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
