const express = require("express");
const path = require("path");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");
const userRoutes = require("./routes/userRoutes");
const electionRoutes = require("./routes/electionRoutes");

require("dotenv").config();
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/elections", electionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

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
