const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
require("dotenv").config();

const db = require("./connection");
db();

// Routes
const userRoutes = require("./routes/userRoute");
const feedbackRoutes = require("./routes/feedbackRoute");

// Models
const userModels = require("./models/userModel");
const feedbackModels = require("./models/feedbackModel");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/students", userRoutes);
app.use("/feedbacks", feedbackRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});