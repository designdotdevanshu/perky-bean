const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "production"; // Ensure the environment variable is set

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database CONNECTED");
  })
  .catch((err) => {
    console.log("Database ERROR", err);
  });

// Middleware
const origins = ["http://localhost:3000", "https://perky-bean.vercel.app"];
app.use(cors({ origin: origins })); // Adjust CORS for production
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());

// Define routes
if (env === "development") {
  app.use(require("./routes/gateway/webHook"));
  app.use(require("./auth"));
  app.use(require("./routes/index"));
} else {
  app.use("/api", require("./routes/gateway/webHook"));
  app.use("/api", require("./auth"));
  app.use("/api", require("./routes/index"));
}

app.get("/healthz", (req, res) => {
  res.status(200).send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
