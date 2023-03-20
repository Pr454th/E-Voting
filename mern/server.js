const express = require("express");
const path = require("path");
const colors = require("colors");
const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");
const userRoutes = require("./routes/userRoutes");
const electionRoutes = require("./routes/electionRoutes");

require("dotenv").config();
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/elections", electionRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${
      process.env.PORT || 5000
    }`.yellow.bold
  )
);
